# Daiwang Khera — Portfolio

Personal portfolio site built with Next.js 15 (App Router). Live at [daiwang-khera.vercel.app](https://daiwang-khera.vercel.app).

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15, App Router, TypeScript (strict) |
| Styling | Tailwind CSS, CSS theme variables (light/dark) |
| Animation | GSAP, Lenis smooth scroll, Framer Motion (buttons) |
| 3D | Three.js, React Three Fiber (grain overlay) |
| Deploy | Vercel |

## Getting started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Dev server runs at **http://localhost:3000** (Next.js default; no custom port in `next.config.ts`).

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

## Project structure

```
portfolio2/
├── app/                    # App Router pages & layouts
│   ├── layout.tsx          # Root layout, metadata, theme script
│   ├── page.tsx            # Home page
│   ├── globals.css         # Theme tokens, base styles
│   ├── icon.tsx            # Dynamic favicon (DK monogram)
│   ├── apple-icon.tsx      # iOS home screen icon
│   ├── opengraph-image.tsx # OG image generation
│   ├── projects/           # Case study pages
│   ├── uses/               # Uses / stack page
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── sections/           # Hero, Projects, Experience, etc.
│   ├── ui/                 # Navbar, command palette, theme toggle
│   ├── canvas/             # WebGL grain overlay
│   └── providers/          # Lenis scroll provider
├── lib/                    # Site data, audio, utilities
├── hooks/                  # useReducedMotion, useMousePosition
├── public/                 # Static assets (resume.pdf)
├── types/                  # Shared TypeScript types
├── eslint.config.mjs
├── tailwind.config.ts
└── next.config.ts
```

## Deploy

Hosted on Vercel. Pushes to `main` trigger automatic deploys when the repo is connected.

To deploy a fork: import the repo in [Vercel](https://vercel.com), install command `npm install`, build command `npm run build`, output directory `.next` (default for Next.js).

## License

MIT — see [LICENSE](LICENSE).
