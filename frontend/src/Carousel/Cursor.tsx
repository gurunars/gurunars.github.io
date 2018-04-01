export interface Cursor {
  current: number | null;
  next: number | null;
  previous: number | null;
}

const getIndex = (items: any[], index: number): number | null => {
  if (index < 0 || index >= items.length) {
    return null;
  } else {
    return index;
  }
};

export const getCursorItems = (items: any[], index: number): Cursor => {
  return ({
    current: getIndex(items, index),
    next: getIndex(items, index + 1),
    previous: getIndex(items, index - 1)
  });
};
