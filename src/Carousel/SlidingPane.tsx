import type React from 'react'
import { useState } from 'react'

type Direction = 'forward' | 'back'

// One state value: what is on screen and what is animating away.
interface Slide {
  shown: number
  leaving: number | null
  direction: Direction
}

const paneStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflowY: 'auto',
}

// Slides the outgoing pane out and the incoming pane in whenever `position`
// changes; the animation is invisible to the caller, which only renders a
// position. Styles live in theme.css (carousel-* classes). Panes need an
// opaque background matching their host so cards cannot shine through
// mid-slide.
const SlidingPane = (props: {
  position: number
  background?: string
  render: (position: number) => React.ReactElement
}) => {
  const [slide, setSlide] = useState<Slide>({ shown: props.position, leaving: null, direction: 'forward' })

  // Render-phase derivation: a new position starts a slide away from the pane
  // currently shown.
  if (props.position !== slide.shown) {
    setSlide({
      shown: props.position,
      leaving: slide.shown,
      direction: props.position > slide.shown ? 'forward' : 'back',
    })
  }

  const suffix = slide.direction === 'forward' ? 'fwd' : 'back'
  const pane = { ...paneStyle, backgroundColor: props.background || 'var(--bg)' }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {slide.leaving !== null && (
        <div key={`leaving-${slide.leaving}`} className={`carousel-leave-${suffix}`} style={pane}>
          {props.render(slide.leaving)}
        </div>
      )}
      <div
        key={`shown-${slide.shown}`}
        className={slide.leaving === null ? undefined : `carousel-enter-${suffix}`}
        style={pane}
        onAnimationEnd={() => setSlide({ ...slide, leaving: null })}
      >
        {props.render(slide.shown)}
      </div>
    </div>
  )
}

export default SlidingPane
