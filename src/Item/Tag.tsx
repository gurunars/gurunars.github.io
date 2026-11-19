import type React from 'react'

import './tag.css'

// A chip. It may be clickable and it may be the selected one; what either of
// those looks like is tag.css's business.
const Tag = (props: { children: React.ReactNode; selected?: boolean; onClick?: () => void }) => (
  <i
    className="tag"
    data-selected={props.selected ?? false}
    data-clickable={props.onClick !== undefined}
    onClick={props.onClick}
  >
    {props.children}
  </i>
)

export default Tag
