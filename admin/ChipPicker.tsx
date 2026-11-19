import type React from 'react'
import { useState } from 'react'

import './chipPicker.css'

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
    <div className="chip-picker">
      <div className="chip-picker-box">
        {props.selected.map((key) => (
          <span key={key} className="chip-picker-chip">
            {key}
            <span className="chip-picker-remove" title="Remove" onClick={() => remove(key)}>
              ×
            </span>
          </span>
        ))}
        <input
          className="chip-picker-input"
          value={editing.query}
          placeholder={props.selected.length === 0 ? props.placeholder : undefined}
          onChange={(event) => setEditing({ query: event.target.value, highlight: 0, open: true })}
          onFocus={() => setEditing({ ...editing, open: true })}
          onBlur={() => setEditing(idle)}
          onKeyDown={onKeyDown}
        />
      </div>
      {editing.open && matches.length > 0 && (
        <div className="chip-picker-menu">
          {matches.map((option, index) => (
            <div
              key={option.key}
              className="chip-picker-option"
              data-highlighted={index === highlight}
              // pick on mousedown so the input's blur cannot swallow the click
              onMouseDown={(event) => {
                event.preventDefault()
                pick(option.key)
              }}
              onMouseEnter={() => setEditing({ ...editing, highlight: index })}
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
