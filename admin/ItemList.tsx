import type React from 'react'

import { typeToSpecMapping } from '../src/Site'
import type { DocItem, DocLink } from './doc'

import './itemList.css'

const ItemList = (props: {
  items: DocItem[]
  links: DocLink[]
  selectedIndex: number
  onSelect: (index: number) => void
}) => {
  const locationName = (alias?: string) => props.links.find((link) => link.alias === alias)?.name

  return (
    <div>
      {props.items.map((item, index) => {
        const subtitle = [locationName(item.location), `${item.startDate || '?'} - ${item.endDate || 'TBD'}`]
          .filter(Boolean)
          .join(' | ')
        return (
          <button
            type="button"
            key={index}
            className="entry-list-row"
            data-active={props.selectedIndex === index}
            // The same colour the site's presentation gives this entry type.
            style={{ '--type-color': typeToSpecMapping[item.type]?.color } as React.CSSProperties}
            onClick={() => props.onSelect(index)}
          >
            <div className="entry-list-title">{item.title || '(untitled)'}</div>
            <div className="entry-list-subtitle">{subtitle}</div>
          </button>
        )
      })}
    </div>
  )
}

export default ItemList
