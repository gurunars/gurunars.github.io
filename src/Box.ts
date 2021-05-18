import { useState } from 'react'

// TODO: avoid comparison by reference
export default interface Box<T> {
  set(value: T): void;
  get(): T;
}

export const useBoxState = <T>(initial: T): Box<T> => {
  const [value, setValue] = useState(initial)
  return {
    get: () => value,
    set: (it: T) => setValue(it),
  }
}
