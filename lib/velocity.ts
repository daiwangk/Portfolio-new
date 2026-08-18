/**
 * Shared Lenis scroll velocity store.
 * LenisProvider writes `value` on every scroll frame.
 * Marquee reads it in its GSAP ticker — zero overhead, no React state.
 */
export const scrollVelocity = { value: 0 }
