import { ImageResponse } from "next/og";

// The preview image shown when someone shares createovate.io (1200×630).
export const alt = "Createovate: Create boldly. Build carefully.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  // A deterministic dot field that echoes the hero's particle form.
  const dots: { x: number; y: number; r: number; c: string; o: number }[] = [];
  const colors = ["#6F8CFF", "#C493FF", "#FF7A45"];
  const n = 220;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const th = i * golden;
    const x = Math.cos(th) * r;
    const z = Math.sin(th) * r;
    const near = (z + 1) / 2;
    const t = (x + 1) / 2;
    dots.push({
      x: 900 + x * 190,
      y: 315 - y * 190,
      r: 2 + near * 3,
      c: colors[t < 0.4 ? 0 : t < 0.7 ? 1 : 2],
      o: 0.3 + near * 0.7,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0A0D1C",
          color: "#E6ECFF",
          padding: "72px 80px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x - d.r,
              top: d.y - d.r,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: 999,
              background: d.c,
              opacity: d.o,
            }}
          />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <path d="M24.14 10.19 A10 10 0 1 0 24.14 21.81" stroke="#C493FF" strokeWidth="4.2" strokeLinecap="round" />
            <circle cx="26.6" cy="16" r="2.5" fill="#FF7A45" />
          </svg>
          Createovate
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: -2 }}>
          <span style={{ fontWeight: 700 }}>Create boldly.</span>
          <span style={{ opacity: 0.85 }}>Build carefully.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#A9B1D1" }}>Independent software studio</div>
      </div>
    ),
    size
  );
}
