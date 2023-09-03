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

const set = <K extends string, T extends Record<K, unknown>>(bigger: T, key: K, value: T[K]) => {

}


const createField = <T extends Record<string, unknown>>(bigger: T) => <K extends keyof T>(key: K): Box<T[K]> => {
  return undefined as T[K]
}

const foo = {
  bar: 11,
  foo: true
}

const r = createField(foo)('foo')
