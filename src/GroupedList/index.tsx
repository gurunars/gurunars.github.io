import type React from 'react'

import type { GroupedItems } from './interfaces'

import './style.css'

// Titled groups of items: a wrapping grid of fixed-size cells on a wide page,
// one full-width column on a narrow one (see style.css).
const GroupedList = <T,>(props: {
  items: Array<GroupedItems<T>>
  renderItem: (props: { item: T }) => React.ReactElement<any>
}): React.ReactElement<any> => (
  <div className="grouped-list">
    {props.items.map((group) => (
      <div key={group.group} className="grouped-list-group">
        <h2 className="grouped-list-title">{group.group}</h2>
        <div>
          {group.elements.map((element, index) => (
            <div key={index} className="grouped-list-cell">
              {props.renderItem({ item: element })}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default GroupedList
