"use client";

/*
  ParticleStage — the hero animation.

  Thousands of glowing points build four 3D forms in a loop. Each form is a step
  in how a product gets made:
    1 Spark      a sphere          (the idea)
    2 Explore    a torus knot      (turning it over, testing it)
    3 Structure  a wave lattice    (the foundation)
    4 Ship       the Createovate C (the finished product)

  How it works, frame by frame (about 60 times a second):
    target shape points → blend from the old shape (each point has its own delay
    and a curved path) → tilt and sway in 3D (follows the pointer) → project to
    2D with perspective → push away from the cursor → draw a glowing sprite.

  Respectful by default: it pauses when off screen or in a background tab, and
  people who set "reduce motion" get a still image they can step through.
*/

import { useCallback, useEffect, useRef, useState } from "react";

const STAGES = [
  { name: "Spark", caption: "Every product starts as one idea." },
  { name: "Explore", caption: "We turn it over and test it from every angle." },
  { name: "Structure", caption: "Then we give it a solid foundation." },
  { name: "Ship", caption: "And put it in people’s hands." },
] as const;

const HOLD_MS = 5200; // time a form holds before the next one builds
const MORPH_MS = 2400; // time to rebuild into the next form
const MAX_DELAY = 0.38; // how staggered the points leave (0 = all at once)
const SWIRL = 0.42; // how far points arc away mid-flight
const CAMERA = 3.6; // perspective distance (smaller = stronger 3D)

// Palette for the points: cool "innovate" blue → violet → warm "create" ember.
const PALETTE: [number, number, number][] = [
  [111, 140, 255], // Ion #6F8CFF
  [196, 147, 255], // Bloom #C493FF
  [255, 122, 69], // Ember #FF7A45
];
const SPRITE_STEPS = 28;

type Shape = { pts: Float32Array; tilt: number; sway: number };

// Small seeded random generator, so the art looks the same on every visit.
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

function buildShapes(n: number, rand: () => number): Shape[] {
  const golden = Math.PI * (3 - Math.sqrt(5));

  // 1 Spark — an evenly covered sphere.
  const sphere = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const th = i * golden;
    const s = 1 + (rand() - 0.5) * 0.05;
    sphere[i * 3] = Math.cos(th) * r * s;
    sphere[i * 3 + 1] = y * s;
    sphere[i * 3 + 2] = Math.sin(th) * r * s;
  }

  // 2 Explore — a (2,3) torus knot with a soft, thick tube.
  const knot = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 2 + Math.cos(3 * t);
    const u = rand() * Math.PI * 2;
    const v = Math.acos(2 * rand() - 1);
    const thick = 0.085 * Math.cbrt(rand());
    knot[i * 3] = (r * Math.cos(2 * t)) / 3 + Math.sin(v) * Math.cos(u) * thick;
    knot[i * 3 + 1] = (r * Math.sin(2 * t)) / 3 + Math.sin(v) * Math.sin(u) * thick;
    knot[i * 3 + 2] = (Math.sin(3 * t) / 3) * 1.5 + Math.cos(v) * thick;
  }

  // 3 Structure — a rippled grid seen from above.
  const lattice = new Float32Array(n * 3);
  const g = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / g);
  for (let i = 0; i < n; i++) {
    const u = i % g;
    const v = Math.floor(i / g);
    const x = (u / (g - 1)) * 1.8 - 0.9;
    const z = (v / Math.max(1, rows - 1)) * 1.8 - 0.9;
    lattice[i * 3] = x;
    lattice[i * 3 + 1] = 0.17 * Math.sin(x * 3.2 + 0.6) * Math.cos(z * 2.8);
    lattice[i * 3 + 2] = z;
  }

  // 4 Ship — the Createovate mark: an open ring with a spark in the gap.
  const ship = new Float32Array(n * 3);
  const dots = Math.round(n * 0.07);
  const ring = n - dots;
  const R = 0.9;
  const gap = 0.62;
  for (let i = 0; i < ring; i++) {
    const phi = gap + ((Math.PI * 2 - gap * 2) * i) / (ring - 1);
    const psi = (i * 2.399963) % (Math.PI * 2);
    const tube = 0.17 * (0.75 + rand() * 0.25);
    ship[i * 3] = (R + tube * Math.cos(psi)) * Math.cos(phi);
    ship[i * 3 + 1] = (R + tube * Math.cos(psi)) * Math.sin(phi);
    ship[i * 3 + 2] = tube * Math.sin(psi);
  }
  for (let i = ring; i < n; i++) {
    const u = rand() * Math.PI * 2;
    const v = Math.acos(2 * rand() - 1);
    const r = 0.13 * Math.cbrt(rand());
    ship[i * 3] = R + 0.12 + Math.sin(v) * Math.cos(u) * r;
    ship[i * 3 + 1] = Math.sin(v) * Math.sin(u) * r;
    ship[i * 3 + 2] = Math.cos(v) * r;
  }

  return [
    { pts: sphere, tilt: 0.25, sway: 0.85 },
    { pts: knot, tilt: 0.35, sway: 0.75 },
    { pts: lattice, tilt: 0.88, sway: 0.5 },
    { pts: ship, tilt: 0.06, sway: 0.32 },
  ];
}

// Pre-draw one soft glowing dot per colour, so each frame only copies images.
function buildSprites(): HTMLCanvasElement[] {
  const sprites: HTMLCanvasElement[] = [];
  const size = 64;
  for (let s = 0; s < SPRITE_STEPS; s++) {
    const t = s / (SPRITE_STEPS - 1);
    const seg = t < 0.5 ? 0 : 1;
    const local = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
    const a = PALETTE[seg];
    const b = PALETTE[seg + 1];
    const r = Math.round(a[0] + (b[0] - a[0]) * local);
    const g = Math.round(a[1] + (b[1] - a[1]) * local);
    const bl = Math.round(a[2] + (b[2] - a[2]) * local);
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const x = c.getContext("2d");
    if (!x) continue;
    const grad = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    const hot = (v: number) => Math.round(v + (255 - v) * 0.6);
    grad.addColorStop(0, `rgba(${hot(r)},${hot(g)},${hot(bl)},1)`);
    grad.addColorStop(0.18, `rgba(${r},${g},${bl},0.95)`);
    grad.addColorStop(0.42, `rgba(${r},${g},${bl},0.22)`);
    grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
    x.fillStyle = grad;
    x.fillRect(0, 0, size, size);
    sprites.push(c);
  }
  return sprites;
}

export default function ParticleStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const goToRef = useRef<(i: number) => void>(() => {});
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = seeded(20261004);
    const area = window.innerWidth * window.innerHeight;
    const N = Math.round(Math.min(2600, Math.max(900, area / 520)));
    const shapes = buildShapes(N, rand);
    const sprites = buildSprites();

    // Per-point data.
    const from = new Float32Array(N * 3); // where each point started this build
    const cur = new Float32Array(N * 3); // where each point is right now
    const swirl = new Float32Array(N * 3); // the arc each point takes mid-flight
    const wobble = new Float32Array(N * 3); // tiny idle drift direction
    const delay = new Float32Array(N);
    const phase = new Float32Array(N);
    const jitter = new Float32Array(N);
    const offX = new Float32Array(N); // cursor push, smoothed
    const offY = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      // Start scattered far out, then fly in to build the first form.
      const u = rand() * Math.PI * 2;
      const v = Math.acos(2 * rand() - 1);
      const r = 2.6 + rand() * 2.4;
      from[i * 3] = Math.sin(v) * Math.cos(u) * r;
      from[i * 3 + 1] = Math.sin(v) * Math.sin(u) * r;
      from[i * 3 + 2] = Math.cos(v) * r * 0.6;
      for (let k = 0; k < 3; k++) {
        swirl[i * 3 + k] = (rand() - 0.5) * 2;
        wobble[i * 3 + k] = (rand() - 0.5) * 2;
      }
      delay[i] = rand() * MAX_DELAY;
      phase[i] = rand() * Math.PI * 2;
      jitter[i] = (rand() - 0.5) * 0.16;
    }
    cur.set(from);

    // Faint background dust that drifts and shifts with the pointer (depth).
    const DUST = 70;
    const dust = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dust[i * 3] = rand();
      dust[i * 3 + 1] = rand();
      dust[i * 3 + 2] = 0.2 + rand() * 0.8;
    }

    let current = 0;
    let morphing = !reduceMotion;
    let morphT = 0;
    let holdT = 0;
    let fromTilt = shapes[0].tilt;
    let fromSway = shapes[0].sway;
    let tilt = fromTilt;
    let sway = fromSway;
    let time = 0;
    let last = 0;
    let raf = 0;
    let running = false;
    let visible = true;

    // Layout (device pixels).
    let dpr = 1;
    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let sizeK = 1;

    // Pointer.
    let ptrX = 0;
    let ptrY = 0;
    let ptrActive = false;
    let aimX = 0;
    let aimY = 0;
    let lookX = 0;
    let lookY = 0;

    function layout() {
      if (!canvas) return;
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.round(cssW * dpr);
      H = Math.round(cssH * dpr);
      canvas.width = W;
      canvas.height = H;
      let x: number;
      let y: number;
      let r: number;
      if (cssW >= 1024) {
        // Side by side: form on the right half.
        x = cssW * 0.72;
        y = cssH * 0.45;
        r = Math.min(cssW * 0.19, cssH * 0.28);
      } else {
        // Stacked: the canvas is only the top band; form sits in its middle.
        x = cssW * 0.5;
        y = cssH * 0.56;
        r = Math.min(cssW * (cssW >= 700 ? 0.26 : 0.32), cssH * 0.32);
      }
      cx = x * dpr;
      cy = y * dpr;
      R = r * dpr;
      // Smaller forms get smaller points, so they stay crisp instead of blobby.
      sizeK = Math.min(1, Math.max(0.55, r / 260));
    }

    function startBuild(next: number) {
      from.set(cur);
      fromTilt = tilt;
      fromSway = sway;
      current = next;
      morphT = 0;
      holdT = 0;
      morphing = true;
      setStage(next);
    }

    function draw() {
      if (!ctx) return;
      const shape = shapes[current];
      const T = shape.pts;
      const g = morphing ? morphT / MORPH_MS : 1;
      const ge = easeInOut(clamp01(g));
      tilt = fromTilt + (shape.tilt - fromTilt) * ge;
      sway = fromSway + (shape.sway - fromSway) * ge;

      lookX += (aimX - lookX) * 0.05;
      lookY += (aimY - lookY) * 0.05;
      const ry = sway * Math.sin(time * 0.22) + lookX * 0.5;
      const rx = tilt + lookY * 0.3;
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);

      // Soft light behind the form.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.7);
      glow.addColorStop(0, "rgba(111,140,255,0.10)");
      glow.addColorStop(0.6, "rgba(196,147,255,0.035)");
      glow.addColorStop(1, "rgba(10,13,28,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - R * 1.7, cy - R * 1.7, R * 3.4, R * 3.4);

      ctx.globalCompositeOperation = "lighter";

      // Dust layer.
      const dustSprite = sprites[3];
      for (let i = 0; i < DUST; i++) {
        const k = i * 3;
        const depth = dust[k + 2];
        if (!reduceMotion) {
          dust[k + 1] -= 0.000012 * depth * 16;
          if (dust[k + 1] < -0.02) dust[k + 1] = 1.02;
        }
        const x = dust[k] * W + lookX * 26 * depth * dpr;
        const y = dust[k + 1] * H + lookY * 18 * depth * dpr;
        const s = (0.7 + depth * 0.9) * dpr * 3;
        ctx.globalAlpha = 0.12 + depth * 0.22;
        ctx.drawImage(dustSprite, x - s, y - s, s * 2, s * 2);
      }

      const pushR = 110 * dpr;
      const pushR2 = pushR * pushR;
      const push = 34 * dpr;
      const span = 1 - MAX_DELAY;

      for (let i = 0; i < N; i++) {
        const k = i * 3;
        let p = 1;
        if (morphing) p = easeInOut(clamp01((g - delay[i]) / span));
        let x = from[k] + (T[k] - from[k]) * p;
        let y = from[k + 1] + (T[k + 1] - from[k + 1]) * p;
        let z = from[k + 2] + (T[k + 2] - from[k + 2]) * p;
        if (morphing && p > 0 && p < 1) {
          const s = Math.sin(Math.PI * p) * SWIRL;
          x += swirl[k] * s;
          y += swirl[k + 1] * s;
          z += swirl[k + 2] * s;
        }
        const wv = Math.sin(time * 1.4 + phase[i]) * 0.013;
        x += wobble[k] * wv;
        y += wobble[k + 1] * wv;
        z += wobble[k + 2] * wv;
        cur[k] = x;
        cur[k + 1] = y;
        cur[k + 2] = z;

        // Rotate (sway around Y, tilt around X), then perspective.
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const persp = CAMERA / (CAMERA - z2);
        let sx = cx + x1 * R * persp;
        let sy = cy - y2 * R * persp;

        // Points slide out of the cursor's way.
        let tx = 0;
        let ty = 0;
        if (ptrActive) {
          const dx = sx - ptrX;
          const dy = sy - ptrY;
          const d2 = dx * dx + dy * dy;
          if (d2 < pushR2 && d2 > 0.5) {
            const d = Math.sqrt(d2);
            const f = 1 - d / pushR;
            tx = (dx / d) * f * f * push;
            ty = (dy / d) * f * f * push;
          }
        }
        offX[i] += (tx - offX[i]) * 0.14;
        offY[i] += (ty - offY[i]) * 0.14;
        sx += offX[i];
        sy += offY[i];

        // Warm on the right, cool on the left, so colour sweeps as it turns.
        const ct = clamp01(0.5 + 0.5 * (x1 * 0.8 + y2 * 0.2) + jitter[i]);
        const near = clamp01((z2 + 1.2) / 2.4);
        const size = (1.1 + 2.0 * near) * persp * dpr * 3 * sizeK;
        ctx.globalAlpha = 0.2 + 0.8 * near;
        ctx.drawImage(sprites[(ct * (SPRITE_STEPS - 1)) | 0], sx - size, sy - size, size * 2, size * 2);
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(50, now - last) : 16;
      last = now;
      time += dt / 1000;
      if (morphing) {
        morphT += dt;
        if (morphT >= MORPH_MS) {
          morphing = false;
          holdT = 0;
        }
      } else {
        holdT += dt;
        if (holdT >= HOLD_MS) startBuild((current + 1) % shapes.length);
      }
      // Progress line under the active stage.
      fillRefs.current.forEach((el, idx) => {
        if (!el) return;
        const v = idx === current ? (morphing ? 0 : holdT / HOLD_MS) : 0;
        el.style.transform = `scaleX(${v.toFixed(4)})`;
      });
      draw();
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }
    function sync() {
      if (visible && !document.hidden) start();
      else stop();
    }

    function drawStill() {
      // Reduced motion: show the finished form, no movement.
      from.set(shapes[current].pts);
      morphing = false;
      fromTilt = shapes[current].tilt;
      fromSway = shapes[current].sway;
      draw();
    }

    goToRef.current = (i: number) => {
      if (i === current && !morphing) return;
      if (reduceMotion) {
        current = i;
        setStage(i);
        drawStill();
      } else {
        startBuild(i);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      ptrActive = inside && !reduceMotion;
      ptrX = (e.clientX - rect.left) * dpr;
      ptrY = (e.clientY - rect.top) * dpr;
      if (inside && !reduceMotion) {
        aimX = clampSigned(((e.clientX - rect.left) / rect.width) * 2 - 1);
        aimY = clampSigned(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };
    const onPointerLeave = () => {
      ptrActive = false;
      aimX = 0;
      aimY = 0;
    };
    function clampSigned(v: number) {
      return v < -1 ? -1 : v > 1 ? 1 : v;
    }

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      if (reduceMotion) drawStill();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    if (reduceMotion) drawStill();
    else start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const select = useCallback((i: number) => goToRef.current(i), []);

  return (
    <>
      <div className="hero__art" aria-hidden="true">
        <canvas ref={canvasRef} className="hero__canvas" />
      </div>

      <div className="stages">
        <ol className="stages__list" aria-label="How a product takes shape">
          {STAGES.map((s, i) => (
            <li key={s.name} className="stages__item">
              <button
                type="button"
                className="stages__button"
                aria-pressed={stage === i}
                onClick={() => select(i)}
              >
                <span className="stages__track" aria-hidden="true">
                  <span
                    className="stages__fill"
                    ref={(el) => {
                      fillRefs.current[i] = el;
                    }}
                  />
                </span>
                <span className="stages__label">
                  <span className="stages__num">{i + 1}</span>
                  {s.name}
                </span>
                <span className="stages__caption">{s.caption}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="stages__now" aria-hidden="true">
          {STAGES[stage].caption}
        </p>
      </div>
    </>
  );
}
