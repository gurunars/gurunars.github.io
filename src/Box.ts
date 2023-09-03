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

export const createFieldBox = <T extends Record<string, unknown>>(
  data: T,
  set: (bigger: T) => void
) => <K extends keyof T>(key: K): Box<T[K]> => ({
  get: () => data[key],
  set: (value: any) => set(merge(data, { [key]: value }) as T),
})
