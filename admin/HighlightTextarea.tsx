import type React from 'react'
import { useRef } from 'react'

export interface Segment {
  text: string
  isTag: boolean
}

const sharedTextStyle: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 14,
  lineHeight: '20px',
  padding: 6,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  boxSizing: 'border-box',
  width: '100%',
  border: '1px solid transparent',
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
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        ref={backdrop}
        aria-hidden
        style={{
          ...sharedTextStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          overflow: 'hidden',
          color: 'black',
          backgroundColor: 'white',
          borderColor: '#bbb',
          borderRadius: 3,
        }}
      >
        {props.segment(props.value).map((seg, position) => (
          <span
            key={position}
            style={
              seg.isTag ? { backgroundColor: '#f5edc0', borderRadius: 3, outline: '1px solid #d9c869' } : undefined
            }
          >
            {seg.text}
          </span>
        ))}
        {/* trailing newline so the backdrop keeps the textarea's final empty line height */}
        {'\n'}
      </div>
      <textarea
        rows={props.rows || 3}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        onScroll={(event) => {
          if (backdrop.current) {
            backdrop.current.scrollTop = event.currentTarget.scrollTop
          }
        }}
        style={{
          ...sharedTextStyle,
          position: 'relative',
          display: 'block',
          color: 'transparent',
          caretColor: 'black',
          backgroundColor: 'transparent',
          borderColor: '#bbb',
          borderRadius: 3,
          resize: 'vertical',
        }}
      />
    </div>
  )
}

export default HighlightTextarea
