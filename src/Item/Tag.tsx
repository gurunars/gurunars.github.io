import type React from 'react'

import { merge } from '../utils'

const Tag = (props: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) => (
  <i
    onClick={props.onClick}
    style={merge(
      {
        backgroundColor: 'var(--chip-bg)',
        border: '1px solid var(--chip-border)',
        display: 'inline-block',
        textDecoration: 'none',
        whiteSpace: 'pre',
        color: 'var(--chip-text)',
        marginRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        borderRadius: 6,
      },
      props.style || {},
    )}
  >
    {props.children}
  </i>
)

export default Tag
