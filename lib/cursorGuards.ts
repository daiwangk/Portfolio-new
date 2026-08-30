export function canUseCustomCursor(reduced: boolean): boolean {
  if (reduced || typeof window === 'undefined') return false
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const canHover = window.matchMedia('(hover: hover)').matches
  return finePointer && canHover && !coarsePointer
}
