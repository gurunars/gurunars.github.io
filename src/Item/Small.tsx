import type React from 'react'

import { CircleUrl, Url } from '../Link'
import { durationToRangeString, type Item } from './interface'

import './small.css'

// Structure and behaviour only: what the card shows and what a click does.
// How it looks lives in small.css. The one value that crosses over is the
// entry type's colour, handed to the style as the --type-color variable.
const ItemView = ({
  item,
  onClick,
  typeColor,
}: {
  item: Item
  onClick: () => void
  typeColor?: string
}): React.ReactElement<any> => (
  <div className="card" style={{ '--type-color': typeColor } as React.CSSProperties}>
    <div className="card-body">
      <span className="card-title" onClick={onClick}>
        {item.logo && <img className="card-logo" alt="logo" src={item.logo} />}
        {item.title}
      </span>
      <span className="card-description">{item.description}</span>
      <div className="card-meta">
        <span className="card-origin">
          <Url link={item.location} />
        </span>
        <span className="card-period">{durationToRangeString(item.duration)}</span>
      </div>
    </div>
    <div className="card-footer">
      <div className="card-links">
        {item.links.map((link) => (
          <CircleUrl key={link.url} link={link} />
        ))}
      </div>
      <span className="card-more" onClick={onClick}>
        Achievements: <b>{item.achievements.length}</b>
      </span>
    </div>
  </div>
)

export default ItemView
