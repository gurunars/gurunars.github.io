import type { DocLink } from './doc'

import './rows.css'

const PeopleForm = (props: {
  people: DocLink[]
  onPatch: (index: number, patch: Partial<DocLink>) => void
  onDelete: (index: number) => void
}) => (
  <div>
    {props.people.map((person, index) => (
      <div key={index} className="rows-row">
        <input
          className="rows-input"
          value={person.alias}
          placeholder="alias"
          onChange={(e) => props.onPatch(index, { alias: e.target.value })}
        />
        <input
          className="rows-input"
          value={person.name}
          placeholder="name"
          onChange={(e) => props.onPatch(index, { name: e.target.value })}
        />
        <input
          className="rows-input"
          data-wide
          value={person.url}
          placeholder="url"
          onChange={(e) => props.onPatch(index, { url: e.target.value })}
        />
        <button type="button" className="rows-delete" title="Delete person" onClick={() => props.onDelete(index)}>
          ✕
        </button>
      </div>
    ))}
  </div>
)

export default PeopleForm
