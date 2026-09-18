import type React from 'react'

import type { DocLink } from './doc'

const inputStyle: React.CSSProperties = {
  padding: 6,
  fontSize: 13,
  border: '1px solid #bbb',
  borderRadius: 3,
  boxSizing: 'border-box',
}

const PeopleForm = (props: {
  people: DocLink[]
  onPatch: (index: number, patch: Partial<DocLink>) => void
  onDelete: (index: number) => void
}) => (
  <div>
    {props.people.map((person, index) => (
      <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          value={person.alias}
          placeholder="alias"
          onChange={(e) => props.onPatch(index, { alias: e.target.value })}
        />
        <input
          style={{ ...inputStyle, flex: 1 }}
          value={person.name}
          placeholder="name"
          onChange={(e) => props.onPatch(index, { name: e.target.value })}
        />
        <input
          style={{ ...inputStyle, flex: 2 }}
          value={person.url}
          placeholder="url"
          onChange={(e) => props.onPatch(index, { url: e.target.value })}
        />
        <button
          type="button"
          title="Delete person"
          onClick={() => props.onDelete(index)}
          style={{ ...inputStyle, cursor: 'pointer', color: '#a00' }}
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)

export default PeopleForm
