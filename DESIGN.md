# 🎨 Design System — Daiwang Khera Portfolio

> A complete reference for the visual language, component patterns, animation philosophy, and layout architecture of this portfolio.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing Scale](#4-spacing-scale)
5. [Border Radius & Shadows](#5-border-radius--shadows)
6. [Transitions & Easing](#6-transitions--easing)
7. [Component Patterns](#7-component-patterns)
8. [Animation System](#8-animation-system)
9. [Layout Architecture](#9-layout-architecture)
10. [Section Design Breakdown](#10-section-design-breakdown)
11. [Background Effects](#11-background-effects)
12. [Responsive Strategy](#12-responsive-strategy)
13. [Future Redesign Direction](#13-future-redesign-direction)

---

## 1. Design Philosophy

The portfolio is built around **three core design principles:**

| Principle | Implementation |
|---|---|
| **Premium Dark** | Deep near-black backgrounds with controlled contrast, never flat or harsh |
| **Alive & Kinetic** | Every section animates in, cards respond to hover, orbs float in the background |
| **Signal over Noise** | Information hierarchy is strict — one gradient accent, one mono font, consistent spacing |

The aesthetic draws inspiration from:
- **Linear.app** — clean dark UI with purposeful motion
- **Vercel** — minimal, high-contrast, type-led design
- **Raycast** — glassmorphism cards with inner glow on interaction

---

## 2. Color System

All colors are defined as CSS custom properties in `src/index.css`.

### Backgrounds

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#050508` | Page background |
| `--bg-secondary` | `#0a0a10` | Alternating section backgrounds |
| `--bg-card` | `rgba(20, 20, 30, 0.6)` | Glassmorphism card base |
| `--bg-card-hover` | `rgba(30, 30, 45, 0.8)` | Card background on hover |
| `--bg-glass` | `rgba(255, 255, 255, 0.03)` | Ultra-subtle frosted glass |

### Text

| Token | Value | Usage |
|---|---|---|
| `--text-primary` | `#f8f8fc` | Headings, important labels |
| `--text-secondary` | `#a8a8b8` | Body copy, descriptions |
| `--text-muted` | `#6b6b7b` | Timestamps, subtitles, hints |

### Accent

| Token | Value | Usage |
|---|---|---|
| `--accent-primary` | `#7c3aed` | Purple — primary brand color, links |
| `--accent-secondary` | `#a855f7` | Lighter purple — hover states |
| `--accent-tertiary` | `#06b6d4` | Cyan — indicator arrows, highlights |
| `--accent-gradient` | `#7c3aed → #a855f7 → #06b6d4` | Section headings, primary buttons |
| `--accent-glow` | `rgba(124, 58, 237, 0.4)` | Button and card glow shadows |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--border-color` | `rgba(255, 255, 255, 0.06)` | Default card borders |
| `--border-color-light` | `rgba(255, 255, 255, 0.12)` | Secondary button borders |

### Per-Project Accent Gradients

Each project card uses a unique gradient to give it a distinct visual identity:

| Project | Gradient |
|---|---|
| Legal & Financial RAG | `#0ea5e9 → #6366f1` (Sky → Indigo) |
| Retail AI Assistant | `#7c3aed → #a855f7` (Purple) |
| YouTube Shorts Pipeline | `#f43f5e → #fb7185` (Rose) |
| Motion Detection | `#06b6d4 → #3b82f6` (Cyan → Blue) |
| AI Document RAG | `#10b981 → #059669` (Emerald) |
| ElevenLabs Voice Agent | `#f59e0b → #ef4444` (Amber → Red) |
| Team Task Manager | `#8b5cf6 → #ec4899` (Violet → Pink) |

---

## 3. Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

- **Inter** — All UI text, headings, body copy. Chosen for its legibility at small sizes and elegant large display weights.
- **JetBrains Mono** — Period badges, code labels, timestamps. Signals precision and technical credibility.

### Type Scale

| Element | Size | Weight | Notes |
|---|---|---|---|
| `h1` | `clamp(2.75rem, 7vw, 4.5rem)` | 800 | Fluid, caps at 4.5rem |
| `h2` | `clamp(2rem, 5vw, 3rem)` | 700 | Section headers |
| `h3` | `clamp(1.25rem, 2.5vw, 1.5rem)` | 700 | Card titles |
| Body | `1rem` | 400 | Line-height: 1.6 |
| Small label | `0.75–0.85rem` | 600 | Uppercase, tracked |

### Global Heading Rules

```css
letter-spacing: -0.03em;  /* Tight tracking on large display text */
line-height: 1.1;          /* Compressed for impactful headlines */
```

---

## 4. Spacing Scale

A consistent 8-point-derived spacing system:

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `0.25rem` (4px) | Micro gaps |
| `--space-sm` | `0.5rem` (8px) | Tag gaps, icon margins |
| `--space-md` | `1rem` (16px) | Default element spacing |
| `--space-lg` | `1.5rem` (24px) | Card padding subdivisions |
| `--space-xl` | `2rem` (32px) | Card padding, grid gaps |
| `--space-2xl` | `3rem` (48px) | Timeline item spacing |
| `--space-3xl` | `4rem` (64px) | Section title bottom margin |
| `--space-4xl` | `6rem` (96px) | Not currently used |

### Container

```css
--max-width: 1100px;
--section-padding: 6rem 1.5rem;  /* 96px top/bottom, 24px sides */
```

---

## 5. Border Radius & Shadows

### Radius Scale

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `0.5rem` | Small elements |
| `--radius-md` | `0.75rem` | Medium chips, inputs |
| `--radius-lg` | `1rem` | Emoji badge on project cards |
| `--radius-xl` | `1.5rem` | Cards, main components |
| `--radius-full` | `9999px` | Pills, buttons, period badges |

### Shadow Scale

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.3)` | Subtle lift |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.4)` | Mid-weight elements |
| `--shadow-lg` | `0 16px 48px rgba(0,0,0,0.5)` | Floating elements |
| `--shadow-glow` | `0 0 40px var(--accent-glow)` | Glowing orb, hero |

### Card Hover Shadow (multi-layer)
```css
box-shadow:
  0 25px 50px rgba(0, 0, 0, 0.4),       /* depth shadow */
  0 0 80px rgba(124, 58, 237, 0.15),    /* purple ambient glow */
  inset 0 1px 0 rgba(255, 255, 255, 0.1); /* top inner highlight */
```

---

## 6. Transitions & Easing

All transitions use **Material Design's standard easing curve** for a natural, physics-based feel:

```css
cubic-bezier(0.4, 0, 0.2, 1)  /* Ease in-out — default */
```

| Token | Duration | Curve | Usage |
|---|---|---|---|
| `--transition-fast` | `150ms` | ease-in-out | Tags, links, micro hover |
| `--transition-base` | `300ms` | ease-in-out | Cards, buttons, borders |
| `--transition-slow` | `500ms` | ease-in-out | Background glows |
| `--transition-spring` | `500ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Springy pop effects |

---

## 7. Component Patterns

### `.card` — Glassmorphism Card

```
Background:  rgba(20, 20, 30, 0.6)   — dark frosted glass
Border:      1px solid rgba(255,255,255,0.06)
Backdrop:    blur(20px)
Radius:      1.5rem

::before — top shimmer line (1px gradient from transparent → white → transparent)
::after  — inner purple radial glow (appears on hover)

Hover:
  background → rgba(30, 30, 45, 0.8)
  border → rgba(124, 58, 237, 0.4)
  transform → translateY(-8px)
  box-shadow → multi-layer depth + glow
```

### `.btn-primary` — Gradient CTA Button

```
Background:  accent-gradient (purple → cyan)
Shape:       pill (radius-full)
Shadow:      0 4px 20px accent-glow

::before — white shimmer overlay (appears on hover)

Hover:
  transform → translateY(-3px) scale(1.02)
  shadow → enhanced + wider glow
```

### `.btn-secondary` — Ghost Button

```
Background:  rgba(255,255,255,0.03)  — ultra-subtle
Border:      1px solid rgba(255,255,255,0.12)
Backdrop:    blur(10px)

Hover:
  background → rgba(255,255,255,0.08)
  border-color → accent-primary
  transform → translateY(-3px)
```

### `.tag` — Tech Stack Pill

```
Background:  rgba(124, 58, 237, 0.15)
Color:       accent-secondary (lighter purple)
Border:      1px solid rgba(124, 58, 237, 0.2)
Shape:       pill

Hover:
  background → rgba(124, 58, 237, 0.30)
  border → rgba(124, 58, 237, 0.5)
  transform → scale(1.05)
  glow → 0 0 15px rgba(124, 58, 237, 0.3)
```

---

## 8. Animation System

All scroll-triggered animations use **Framer Motion** with the `whileInView` API.

### Entry Variants (Framer Motion)

```js
// Fade + slide up (used in Experience, Skills, Learning)
hidden:  { opacity: 0, y: 20 }
visible: { opacity: 1, y: 0, duration: 0.4 }

// Project card entry
hidden:  { opacity: 0, y: 30 }
visible: { opacity: 1, y: 0, duration: 0.5 }

// Hero elements (y: 30, staggered by delay)
hidden:  { opacity: 0, y: 30 }
visible: { opacity: 1, y: 0 }
// delay: 0.1 → 0.6 increments
```

### Stagger System

```js
// Container orchestrates child stagger
containerVariants = {
  visible: { transition: { staggerChildren: 0.1 } }
}
```

### Viewport Trigger

```js
viewport={{ once: true, amount: 0.05 }}
// Fires when 5% of the element enters the viewport
// `once: true` prevents re-triggering on scroll back up
```

### CSS Keyframe Animations

```css
/* Floating orbs — slow sinusoidal drift */
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%       { transform: translate(30px, -30px) scale(1.05); }
  50%       { transform: translate(-20px, 20px) scale(0.95); }
  75%       { transform: translate(-30px, -20px) scale(1.02); }
}
/* Duration: 20s — imperceptible but alive */

/* Glow pulse on interactive elements */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px var(--accent-glow); }
  50%       { box-shadow: 0 0 40px var(--accent-glow), 0 0 60px rgba(124,58,237,0.2); }
}
```

---

## 9. Layout Architecture

### Page Structure

```
<BrowserRouter>
  └── SplashIntro (session-gated, shown once)
  └── Layout
        ├── BackgroundParallax   ← fixed, full-page background layer
        ├── AIOrb                ← floating accent orb, z-index 0
        ├── Navbar               ← sticky top, z-index 100
        ├── <main>
        │     ├── Hero           ← 100vh, flex centered
        │     ├── Experience     ← bg-secondary, timeline layout
        │     ├── Projects       ← bg-primary, 3-col grid
        │     ├── Learning       ← bg-primary, 3-col grid
        │     ├── About          ← 2-col (bio + skills)
        │     └── Contact        ← centered CTA
        └── Footer
```

### Section Alternation

Sections alternate between `--bg-primary` and `--bg-secondary` to create visual rhythm without hard dividers.

```
Hero       → bg-primary   (#050508)
Experience → bg-secondary (#0a0a10)
Projects   → bg-primary
Learning   → bg-primary
About      → bg-secondary
Contact    → bg-primary
```

### Grid System

| Section | Layout |
|---|---|
| Projects | `repeat(3, 1fr)` at ≥1024px, `repeat(2, 1fr)` at ≥768px |
| Learning | `repeat(3, 1fr)` at ≥768px |
| About | `2-col` (bio left, skills right) at ≥768px |
| Skills | `repeat(auto-fit, minmax(200px, 1fr))` |

---

## 10. Section Design Breakdown

### Hero
- Full viewport (`100vh`), content vertically centered
- `Open to Work` badge: pulsing green dot, monospace text, glass pill
- Gradient name: `text-gradient` utility class with `background-clip: text`
- Typewriter effect: custom `useState` hook cycling through role strings
- CTA row: primary gradient button + ghost secondary button
- Social icons: SVG inline, hover opacity + scale
- Tech stack pills: staggered entry with `whileHover={{ scale: 1.1, y: -3 }}`

### Experience (Timeline)
- Vertical timeline: marker dots connected by gradient lines
- Each dot has a type-specific color: AI=purple, Frontend=cyan, ML=emerald
- Cards: `.card` with bullet list (`<ul class="exp-bullets">`) replacing old `<p>` descriptions
- Bullet marker color: `--accent-primary` via `li::marker`
- Period badge: monospace font, glass pill, `white-space: nowrap`

### Projects
- 3-column grid (7 total cards, last lone card centered via CSS `:nth-child`)
- Each card: unique gradient glow on hover via `.project-glow` pseudo-overlay
- Header: emoji icon (with gradient bg) + project title
- Body: 3 details (Problem 🧠 / Built 🛠 / Learned 📚) with label + text
- Footer: tag pills + case study or GitHub link

### About
- 2-column layout: left = bio text + 3 stat numbers, right = skill grid
- Stats: `8.0 CGPA`, `3 Internships`, `AIR 18 NCAT` — large number, small label
- Skills: 5 categories, each a card with icon + category name + tag pills

---

## 11. Background Effects

### BackgroundParallax
- Fixed position, full page, z-index: 0
- Subtle grid pattern or noise texture behind all content

### AIOrb
- Floating animated orb (radial gradient blob)
- Slow CSS `float` animation (20s loop)
- Soft blur, low opacity — purely atmospheric

### Section Background Orbs
Each section has its own local `.bg-orb` div positioned absolutely:

```css
.orb-exp     { left: -15%; top: 30%; }    /* Experience — purple */
.orb-projects { right: -20%; top: 20%; }  /* Projects — purple */
.orb-about   { right: -10%; top: 20%; }   /* About — cyan */
.orb-contact { /* two orbs */ }
```

---

## 12. Responsive Strategy

### Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | `< 768px` | Single column, reduced section padding (4rem 1rem), smaller buttons |
| Tablet | `≥ 768px` | 2-column grids, timeline markers shown |
| Desktop | `≥ 1024px` | 3-column project grid, full navbar |

### Mobile Adaptations

- Timeline markers hidden on mobile (`.timeline-marker { display: none }`)
- Navbar collapses to hamburger toggle (`.mobile-toggle`)
- Hero CTA wraps to column
- Section title font scales with `clamp()`
- Exp-header stacks vertically (flex-direction: column)

---

## 13. Future Redesign Direction

> Reference this section when using Google Stitch or any redesign tool.

### Desired Aesthetic Upgrade

- **Cursor:** Custom magnetic cursor — small glowing dot + lagging ring, ring expands on hover
- **Viewport Spotlight:** Radial gradient follows cursor across dark background
- **Bento Grid:** Projects section refactored into varied-size bento grid (1 large feature card + 6 smaller)
- **Grain Texture:** Subtle CSS noise overlay on `body` for analog warmth
- **Section Reveals:** Blur-in reveals instead of simple fade+slide
- **Typography:** Upgrade from Inter to `Space Grotesk` for headings for more personality

### Suggested Color Evolution

```
Current:   Purple #7c3aed + Cyan #06b6d4
Next:      Electric Indigo #6366f1 + Neon Cyan #22d3ee + Deep black #050508
```

### Components to Add

- [ ] Cursor follower component (`useEffect` + `mousemove` listener)
- [ ] Scroll progress indicator (thin top bar)
- [ ] Command palette (`Cmd+K`) for keyboard navigation
- [ ] Subtle parallax depth layers on hero scroll

---

<div align="center">

*Design system maintained by Daiwang Khera · Last updated May 2026*

</div>
