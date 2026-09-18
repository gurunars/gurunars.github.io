import { typeToSpecMapping } from '../src/Site'
import ChipPicker from './ChipPicker'
import type { DocItem, DocLink } from './doc'
import Field from './Field'
import HighlightTextarea from './HighlightTextarea'
import { tagSegments } from './tagSegments'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 6,
  fontSize: 14,
  border: '1px solid #bbb',
  borderRadius: 3,
  boxSizing: 'border-box',
}

const smallButton: React.CSSProperties = {
  border: '1px solid #bbb',
  borderRadius: 3,
  backgroundColor: 'white',
  cursor: 'pointer',
  padding: '2px 8px',
}

import type React from 'react'

const moveInList = <T,>(list: T[], from: number, to: number): T[] => {
  const next = [...list]
  const [taken] = next.splice(from, 1)
  next.splice(to, 0, taken)
  return next
}

const ItemForm = (props: {
  item: DocItem
  links: DocLink[]
  people: DocLink[]
  onPatch: (patch: Partial<DocItem>) => void
}) => {
  const { item, links, people, onPatch } = props
  const achievements = item.achievements || []
  return (
    <div>
      <Field label="Title">
        <input style={inputStyle} value={item.title} onChange={(e) => onPatch({ title: e.target.value })} />
      </Field>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Field label="Type">
            <select style={inputStyle} value={item.type} onChange={(e) => onPatch({ type: e.target.value })}>
              {Object.keys(typeToSpecMapping).map((key) => (
                <option key={key} value={key}>
                  {typeToSpecMapping[key].humanReadableName}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div style={{ flex: 1 }}>
          <Field label="Location (link alias)">
            <select
              style={inputStyle}
              value={item.location || ''}
              onChange={(e) => onPatch({ location: e.target.value || undefined })}
            >
              <option value="">(none)</option>
              {links.map((link) => (
                <option key={link.alias} value={link.alias}>
                  {link.alias}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Field label="Start date">
            <input
              type="date"
              style={inputStyle}
              value={item.startDate || ''}
              onChange={(e) => onPatch({ startDate: e.target.value || undefined })}
            />
          </Field>
        </div>
        <div style={{ flex: 1 }}>
          <Field label="End date (empty = ongoing)">
            <input
              type="date"
              style={inputStyle}
              value={item.endDate || ''}
              onChange={(e) => onPatch({ endDate: e.target.value || undefined })}
            />
          </Field>
        </div>
        <div style={{ flex: 1 }}>
          <Field label="Logo URL">
            <input
              style={inputStyle}
              value={item.logo || ''}
              placeholder="/avatar.jpg"
              onChange={(e) => onPatch({ logo: e.target.value || undefined })}
            />
          </Field>
        </div>
      </div>

      <Field label="Description (#tag and #{multi word tag} are highlighted)">
        <HighlightTextarea
          value={item.description || ''}
          segment={tagSegments}
          onChange={(value) => onPatch({ description: value || undefined })}
        />
      </Field>

      <Field label="Achievements">
        <div>
          {achievements.map((achievement, index) => (
            <div key={index} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <HighlightTextarea
                  value={achievement}
                  rows={2}
                  segment={tagSegments}
                  onChange={(value) =>
                    onPatch({
                      achievements: achievements.map((it, position) => (position === index ? value : it)),
                    })
                  }
                />
              </div>
              <button
                type="button"
                style={smallButton}
                disabled={index === 0}
                title="Move up"
                onClick={() => onPatch({ achievements: moveInList(achievements, index, index - 1) })}
              >
                ↑
              </button>
              <button
                type="button"
                style={smallButton}
                disabled={index === achievements.length - 1}
                title="Move down"
                onClick={() => onPatch({ achievements: moveInList(achievements, index, index + 1) })}
              >
                ↓
              </button>
              <button
                type="button"
                style={{ ...smallButton, color: '#a00' }}
                title="Delete"
                onClick={() => onPatch({ achievements: achievements.filter((_, position) => position !== index) })}
              >
                ✕
              </button>
            </div>
          ))}
          <button type="button" style={smallButton} onClick={() => onPatch({ achievements: [...achievements, ''] })}>
            + Add achievement
          </button>
        </div>
      </Field>

      <Field label="Links">
        <ChipPicker
          options={links.map((link) => ({ key: link.alias, label: `${link.alias} — ${link.name}` }))}
          selected={item.links || []}
          placeholder="Type to attach a link…"
          onChange={(selected) => onPatch({ links: selected.length > 0 ? selected : undefined })}
        />
      </Field>

      <Field label="References">
        <ChipPicker
          options={people.map((person) => ({ key: person.alias, label: `${person.alias} — ${person.name}` }))}
          selected={item.references || []}
          placeholder="Type to attach a person…"
          onChange={(selected) => onPatch({ references: selected.length > 0 ? selected : undefined })}
        />
      </Field>
    </div>
  )
}

export default ItemForm
