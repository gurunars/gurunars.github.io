import type React from 'react'

import './style.css'

// A round floating button around whatever glyph it is given.
const ActionIcon = (props: {
  children: React.ReactNode
  onClick: () => void
  className?: string
}): React.ReactElement<any> => (
  <div className={props.className ? `action-icon ${props.className}` : 'action-icon'} onClick={props.onClick}>
    <div className="action-icon-glyph">{props.children}</div>
  </div>
)

export default ActionIcon
