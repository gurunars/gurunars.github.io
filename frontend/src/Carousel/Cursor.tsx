export interface Item {
  id: string;
}

export interface Cursor<T extends Item> {
  current: T | null;
  next: T | null;
  previous: T | null;
}

export const getCursorItems = <T extends Item>(
  items: T[],
  id: string
): Cursor<T> => {

  let cursor: Cursor<T>;
  let index = items.findIndex(page => page.id === id);
  index = index > -1 ? index : -404;

  return {
    current: items[index],
    next: items[index + 1],
    previous: items[index - 1]
  };
};
