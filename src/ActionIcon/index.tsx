import _ from 'lodash'
import type React from 'react'

import { merge } from '../utils'

const ActionIcon = (props: {
  icon: React.JSX.Element
  onClick: () => void
  rotation: number
  scale: number
  style?: React.CSSProperties
}): React.ReactElement<any> => (
  <div
    onClick={props.onClick}
    style={merge(
      {
        height: 40,
        width: 40,
        borderRadius: '50%',
        backgroundColor: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 30,
        cursor: 'pointer',
        justifyContent: 'center',
        color: 'var(--accent-text)',
      },
      props.style || {},
    )}
  >
    <div
      style={{
        width: '60%',
        height: '60%',
        transform: `rotate(${props.rotation}deg) scale(${props.scale})`,
        fill: _.get(props.style, 'color', 'var(--accent-text)'),
      }}
    >
      {props.icon}
    </div>
  </div>
)

export default ActionIcon
