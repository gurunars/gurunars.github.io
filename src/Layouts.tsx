import type React from 'react'

import { merge } from './utils'

export const FullSize = (props: {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}): React.ReactElement<any> => (
  <div
    className={props.className}
    style={merge(
      {
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
      },
      props.style || {},
    )}
  >
    {' '}
    {props.children}
  </div>
)
