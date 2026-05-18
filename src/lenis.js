import Lenis from 'lenis'

/** Clearance for fixed navbar when scrolling to section anchors */
export const NAV_SCROLL_OFFSET = 88

export const lenis = new Lenis({
  anchors: {
    offset: NAV_SCROLL_OFFSET,
  },
})

let pendingScrollTarget = null

export function initLenis() {
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

/**
 * Scroll to an in-page section. If the target isn't in the DOM (e.g. another route),
 * navigate home first and scroll once the section mounts.
 */
export function scrollToSection(hash, navigate) {
  const selector = hash.startsWith('#') ? hash : `#${hash}`
  const el = document.querySelector(selector)

  if (el) {
    lenis.scrollTo(selector, { offset: NAV_SCROLL_OFFSET })
    return
  }

  if (!navigate) return

  pendingScrollTarget = selector
  navigate('/')
}

export function flushPendingScroll() {
  if (!pendingScrollTarget) return

  const selector = pendingScrollTarget
  pendingScrollTarget = null

  const tryScroll = (attempts = 0) => {
    const el = document.querySelector(selector)
    if (el) {
      lenis.scrollTo(selector, { offset: NAV_SCROLL_OFFSET })
      return
    }
    if (attempts < 30) {
      requestAnimationFrame(() => tryScroll(attempts + 1))
    }
  }

  tryScroll()
}
