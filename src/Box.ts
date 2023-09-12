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

export const box = <T extends Record<string, unknown>>(
  value: T,
  set: (newValue: T) => void,
) => ({
  get: () => value,
  set: (newValue: T) => set(newValue),
})

export const fieldBox = <T extends Record<string, unknown>>(instance: Box<T>) =>
  <K extends keyof T>(key: K): Box<T[K]> => ({
    get: () => instance.get()[key],
    set: (value: any) => instance.set(merge(instance.get(), { [key]: value }) as T),
  })
