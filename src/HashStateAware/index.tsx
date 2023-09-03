import React from 'react'

import jsonpack from 'jsonpack'

import { merge } from '../utils'
import { useState, useEffect } from 'react'

interface Props<T extends {}> {
  initial: T;
  prefix: string;
  children: (data: T, set: (innerData: T) => void) => React.ReactElement<any>;
}

const deserialize = (prefix: string, location: string): Object => {
  try {
    return jsonpack.unpack(location.replace('#' + prefix + '?', ''))
  } catch {
    return {}
  }
}

const serialize = (prefix: string, params: Object): string =>
  '#' + prefix + '?' + jsonpack.pack(params)


const getWindowTop = (): WindowProxy => {
  const top = window.top;
  if (top == null) {
    throw "window.top is null"
  }
  return top
}

const HashAware = <T extends {}>({ initial, prefix, children }: Props<T>) => {
  const [hash, setHash] = useState(initial)

  const top = getWindowTop()

  const updateHash = () =>
    setHash(merge(
      initial,
      deserialize(prefix, top.location.hash),
    ) as T)

  useEffect(() => {
    top.addEventListener('hashchange', updateHash)
    return () => {
      top.removeEventListener('hashchange', updateHash)
    }
  })

  return children(hash, data => {
    top.location.hash = serialize(prefix, data)
  })

}

export default HashAware
