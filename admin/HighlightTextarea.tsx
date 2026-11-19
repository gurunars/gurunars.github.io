import { useRef } from 'react'

import './highlightTextarea.css'

export interface Segment {
  text: string
  isTag: boolean
}

// A textarea with a highlight backdrop: the textarea's own text is
// transparent (the caret stays visible) and a synced element behind it draws
// the same text with the segments the caller marked highlighted.
const HighlightTextarea = (props: {
  value: string
  onChange: (value: string) => void
  segment: (text: string) => Segment[]
  rows?: number
  placeholder?: string
}) => {
  const backdrop = useRef<HTMLDivElement>(null)
  return (
    <div className="highlight">
      <div ref={backdrop} className="highlight-backdrop" aria-hidden>
        {props.segment(props.value).map((seg, position) => (
          <span key={position} className={seg.isTag ? 'highlight-mark' : undefined}>
            {seg.text}
          </span>
        ))}
        {/* trailing newline so the backdrop keeps the textarea's final empty line height */}
        {'\n'}
      </div>
      <textarea
        className="highlight-input"
        rows={props.rows || 3}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        onScroll={(event) => {
          if (backdrop.current) {
            backdrop.current.scrollTop = event.currentTarget.scrollTop
          }
        }}
      />
    </div>
  )
}

export default HighlightTextarea
