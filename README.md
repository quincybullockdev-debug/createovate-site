# createovate.io

The company website for Createovate LLC. One page plus Privacy and Terms.
Built with Next.js on Vercel, in TypeScript, like the rest of our stack.

## Before it goes live

- [ ] **support@ and legal@ must exist.** The site links to `support@createovate.io` and
      `legal@createovate.io`. Create both aliases in Google Workspace (session S0.1, item 2),
      or emails to them bounce.
- [ ] **Confirm the lookmaxxing line** in `app/page.tsx`: "A self-improvement app for iPhone,
      focused on how you look and feel." Every public claim must be true (company rule 5).
- [ ] **Vercel plan.** Hobby is for non-commercial use only. A company site is commercial,
      so the plan moves to Vercel Pro in session S0.2.
- [ ] **Lawyer review** of `/privacy` and `/terms` before we scale (Build Plan, Phase 2).

## Deploy (no Terminal needed)

1. **GitHub:** github.com → **New repository** → name `createovate-site` → Private →
   **Create repository**.
2. On the empty repo page, click **uploading an existing file**. Drag in everything inside the
   unzipped `createovate-site` folder (not the folder itself). Click **Commit changes**.
3. **Vercel:** vercel.com → **Add New… → Project** → find `createovate-site` → **Import**.
   Vercel detects Next.js. Leave the settings as they are → **Deploy**.
4. When it finishes, open the project → **Settings → Domains** → add `createovate.io`
   (and `www.createovate.io`, which Vercel offers to redirect). The domain was bought on
   Vercel, so DNS sets itself up.
5. Open https://createovate.io and check it on your phone too.

## What's in here

| File | What it does |
|---|---|
| `app/page.tsx` | The home page: hero, products, how we work, contact |
| `components/ParticleStage.tsx` | The particle animation and the 4-step rail under it |
| `components/BookingPreview.tsx` | The "Try it" BookWitMe booking demo (sends nothing) |
| `components/CopyEmail.tsx` | Email address with a Copy button |
| `components/SiteHeader.tsx`, `SiteFooter.tsx`, `Mark.tsx` | Header, footer, logo mark |
| `app/privacy/page.tsx`, `app/terms/page.tsx` | Legal pages |
| `app/globals.css` | All styles: colors, type, layout |
| `app/layout.tsx` | Page shell: font, title, description, share preview |
| `app/icon.svg`, `apple-icon.tsx`, `opengraph-image.tsx` | Browser icon, iPhone icon, link preview image |
| `app/robots.ts`, `app/sitemap.ts` | Help search engines find the pages |
| `next.config.ts` | Security headers on every page |
| `app/fonts/` | Mona Sans font file and its license (SIL Open Font License) |

## What gets installed (Vercel does this when it builds)

| Package | Made by | Why | Docs |
|---|---|---|---|
| `next` 16.3.8 | Vercel | The framework: pages, routing, building | https://nextjs.org/docs |
| `react`, `react-dom` 19.3.0 | Meta | Builds the page from components | https://react.dev |
| `typescript` 5.x | Microsoft | Catches mistakes before the site ships | https://www.typescriptlang.org/docs |
| `@types/*` | Community (DefinitelyTyped) | Type info for Node and React | https://github.com/DefinitelyTyped/DefinitelyTyped |

These versions match what Next.js's own starter (`create-next-app` 16.3.8) uses. Next.js 16
needs Node 20.9 or newer; Vercel's default meets that. `package-lock.json` pins every exact
version so Vercel builds the same thing that was tested.

## Plain-English explainer

**What changed:** a new website for Createovate, ready to deploy.

**Analogy:** the site is a storefront window. The particle animation is the moving display
that tells the story (idea → test → foundation → product), and the BookWitMe demo is a
sample on the counter that people can try.

**New terms:**
- **Next.js:** a kit for building websites with React. `app/page.tsx` becomes the page at `/`,
  `app/privacy/page.tsx` becomes `/privacy`. The folder layout is the site map.
- **Component:** a reusable piece of a page, like `SiteHeader`. Written once, used everywhere.
- **`"use client"`:** the first line of a file that runs in the visitor's browser (needed for
  animation and buttons). Files without it are built ahead of time on the server, which is faster.
- **Canvas:** a blank drawing surface in the browser. The particles are drawn on it about
  60 times a second.
- **Static page:** built once at deploy time and served instantly, no database involved.

**Data chain (one animation frame):**
`4 target shapes (up to 2,600 points each)` → `blend from old shape to new, 0.0 → 1.0 over 2.4 s`
→ `tilt and sway in 3D toward your cursor` → `perspective: point at depth z=0.8 draws 1.3×
bigger` → `push points within 110 px of your cursor` → `draw a glowing dot, warm on the right,
cool on the left`.

**Respectful by default:** the animation pauses when it's off screen or the tab is hidden.
People with "Reduce motion" turned on get a still image they can step through with the rail.

**Privacy check:** this site has no cookies, analytics, or forms. If we ever add any of them,
update `/privacy` in the same change (company rule 6).

**One thing to learn:** how Next.js turns folders into pages:
https://nextjs.org/docs/app/getting-started/layouts-and-pages

## Run it on your Mac (optional)

```
npm install
npm run dev
```

`npm install` downloads the packages listed in `package.json` into a `node_modules` folder.
`npm run dev` starts a local preview at http://localhost:3000 that refreshes when you save.
# createovate-site
