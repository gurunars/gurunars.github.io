export interface Cursor {
  current: number | null;
  next: number | null;
  previous: number | null;
}

const getIndex = (size: number, index: number): number | null => {
  if (index < 0 || index >= size) {
    return null
  } else {
    return index
  }
}

export const getCursorItems = (size: number, index: number): Cursor => ({
  current: getIndex(size, index),
  next: getIndex(size, index + 1),
  previous: getIndex(size, index - 1),
})
