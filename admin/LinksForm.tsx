import type React from 'react'

import { getIconForUrl } from '../src/Link/icons/derive'
import type { DocLink } from './doc'

const inputStyle: React.CSSProperties = {
  padding: 6,
  fontSize: 13,
  border: '1px solid #bbb',
  borderRadius: 3,
  boxSizing: 'border-box',
}

// The icon is not editable: it is derived from the URL (see derive.ts), so
// each row just previews what the site will show.
const DerivedIcon = ({ url }: { url: string }) => {
  const Icon = getIconForUrl(url)
  return (
    <span
      title="Icon derived from the URL"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        minWidth: 30,
        height: 30,
        borderRadius: '50%',
        border: '2px solid #444',
      }}
    >
      <Icon style={{ width: '60%', height: '60%', fill: '#444' }} />
    </span>
  )
}

const LinksForm = (props: {
  links: DocLink[]
  onPatch: (index: number, patch: Partial<DocLink>) => void
  onDelete: (index: number) => void
}) => (
  <div>
    {props.links.map((link, index) => (
      <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
        <DerivedIcon url={link.url} />
        <input
          style={{ ...inputStyle, flex: 1 }}
          value={link.alias}
          placeholder="alias"
          onChange={(e) => props.onPatch(index, { alias: e.target.value })}
        />
        <input
          style={{ ...inputStyle, flex: 1 }}
          value={link.name}
          placeholder="name"
          onChange={(e) => props.onPatch(index, { name: e.target.value })}
        />
        <input
          style={{ ...inputStyle, flex: 2 }}
          value={link.url}
          placeholder="url"
          onChange={(e) => props.onPatch(index, { url: e.target.value })}
        />
        <button
          type="button"
          title="Delete link"
          onClick={() => props.onDelete(index)}
          style={{ ...inputStyle, cursor: 'pointer', color: '#a00' }}
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)

export default LinksForm
