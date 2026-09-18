import type React from 'react'

import { typeToSpecMapping } from '../src/Site'
import type { DocItem, DocLink } from './doc'

const rowStyle = (active: boolean, typeColor: string): React.CSSProperties => ({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '6px 8px',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.15)',
  cursor: 'pointer',
  // The same color the site's presentation gives this entry type.
  backgroundColor: active ? '#1b2e3c' : typeColor,
  color: active ? 'white' : 'black',
})

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
        const active = props.selectedIndex === index
        const subtitle = [locationName(item.location), `${item.startDate || '?'} - ${item.endDate || 'TBD'}`]
          .filter(Boolean)
          .join(' | ')
        return (
          <button
            type="button"
            key={index}
            onClick={() => props.onSelect(index)}
            style={rowStyle(active, typeToSpecMapping[item.type]?.color || 'white')}
          >
            <div style={{ fontSize: 13 }}>{item.title || '(untitled)'}</div>
            <div style={{ fontSize: 11, color: active ? '#bbb' : '#444' }}>{subtitle}</div>
          </button>
        )
      })}
    </div>
  )
}

export default ItemList
