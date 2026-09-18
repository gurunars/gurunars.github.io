import type React from 'react'
import { useState } from 'react'

export interface ChipOption {
  key: string
  label: string
}

// Transient input state; the selection itself belongs to the caller.
interface Editing {
  query: string
  highlight: number
  open: boolean
}

const idle: Editing = { query: '', highlight: 0, open: false }

// An "omnibox" multi-select: selected keys render as removable chips, typing
// filters the options, Enter/click attaches a chip, Backspace on an empty
// query detaches the last one. Knows nothing about what the keys mean.
const ChipPicker = (props: {
  selected: string[]
  options: ChipOption[]
  onChange: (selected: string[]) => void
  placeholder?: string
}) => {
  const [editing, setEditing] = useState<Editing>(idle)

  const matches = props.options.filter(
    (option) =>
      !props.selected.includes(option.key) && option.label.toLowerCase().includes(editing.query.toLowerCase()),
  )
  const highlight = Math.min(editing.highlight, Math.max(0, matches.length - 1))

  const pick = (key: string) => {
    props.onChange([...props.selected, key])
    setEditing({ ...idle, open: true })
  }

  const remove = (key: string) => props.onChange(props.selected.filter((it) => it !== key))

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setEditing({ ...editing, open: true, highlight: (highlight + 1) % Math.max(1, matches.length) })
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setEditing({ ...editing, open: true, highlight: (highlight - 1 + matches.length) % Math.max(1, matches.length) })
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (editing.open && matches[highlight]) {
        pick(matches[highlight].key)
      }
    } else if (event.key === 'Escape') {
      setEditing(idle)
    } else if (event.key === 'Backspace' && editing.query === '' && props.selected.length > 0) {
      remove(props.selected[props.selected.length - 1])
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 4,
          padding: 4,
          border: '1px solid #bbb',
          borderRadius: 3,
          backgroundColor: 'white',
          cursor: 'text',
        }}
      >
        {props.selected.map((key) => (
          <span
            key={key}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'Beige',
              borderRadius: 10,
              padding: '3px 9px',
              fontSize: 13,
              whiteSpace: 'nowrap',
            }}
          >
            {key}
            <span
              title="Remove"
              onClick={() => remove(key)}
              style={{ cursor: 'pointer', color: '#a00', fontWeight: 'bold' }}
            >
              ×
            </span>
          </span>
        ))}
        <input
          value={editing.query}
          placeholder={props.selected.length === 0 ? props.placeholder : undefined}
          onChange={(event) => setEditing({ query: event.target.value, highlight: 0, open: true })}
          onFocus={() => setEditing({ ...editing, open: true })}
          onBlur={() => setEditing(idle)}
          onKeyDown={onKeyDown}
          style={{
            flex: 1,
            minWidth: 120,
            border: 'none',
            outline: 'none',
            fontSize: 13,
            padding: 4,
          }}
        />
      </div>
      {editing.open && matches.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: 220,
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #bbb',
            borderRadius: 3,
            boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
            zIndex: 20,
          }}
        >
          {matches.map((option, index) => (
            <div
              key={option.key}
              // pick on mousedown so the input's blur cannot swallow the click
              onMouseDown={(event) => {
                event.preventDefault()
                pick(option.key)
              }}
              onMouseEnter={() => setEditing({ ...editing, highlight: index })}
              style={{
                padding: '6px 10px',
                fontSize: 13,
                cursor: 'pointer',
                backgroundColor: index === highlight ? '#1b2e3c' : 'white',
                color: index === highlight ? 'white' : 'black',
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChipPicker
