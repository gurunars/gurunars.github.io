import { useState } from 'react'

import { merge } from './utils'

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

export const getChildBox = <T, K extends keyof T>(value: T, setter: (key: T) => void) => (key: K): Box<T[K]> => ({
  get: () => value[key],
  set: (value: any) => setter(merge(value, { [key]: value }) as T),
})
