export function canUseCustomCursor(reduced: boolean): boolean {
  if (reduced || typeof window === 'undefined') return false
  // Prefer the primary pointer capability. Many Windows laptops with touch
  // screens match BOTH (pointer: fine) and (pointer: coarse); requiring
  // !coarse was hiding the companion (and custom cursor) on those machines.
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const canHover = window.matchMedia('(hover: hover)').matches
  return finePointer && canHover
}
