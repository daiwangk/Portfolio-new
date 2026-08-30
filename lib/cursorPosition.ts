export const cursorPosition = {
  x: 0,
  y: 0,
  lastMoveTime: 0,
}

export function updateCursorPosition(x: number, y: number): void {
  cursorPosition.x = x
  cursorPosition.y = y
  cursorPosition.lastMoveTime = Date.now()
}
