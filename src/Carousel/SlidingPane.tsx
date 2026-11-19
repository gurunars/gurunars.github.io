import type React from 'react'
import { useState } from 'react'

import './slidingPane.css'

type Direction = 'forward' | 'back'

// One state value: what is on screen and what is animating away.
interface Slide {
  shown: number
  leaving: number | null
  direction: Direction
}

// Slides the outgoing pane out and the incoming pane in whenever `position`
// changes; the animation is invisible to the caller, which only renders a
// position. The motion itself lives in slidingPane.css.
const SlidingPane = (props: { position: number; render: (position: number) => React.ReactElement }) => {
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

  return (
    <div className="sliding-pane" data-direction={slide.direction}>
      {slide.leaving !== null && (
        <div key={`leaving-${slide.leaving}`} className="sliding-pane-slide" data-motion="leave">
          {props.render(slide.leaving)}
        </div>
      )}
      <div
        key={`shown-${slide.shown}`}
        className="sliding-pane-slide"
        data-motion={slide.leaving === null ? 'none' : 'enter'}
        onAnimationEnd={() => setSlide({ ...slide, leaving: null })}
      >
        {props.render(slide.shown)}
      </div>
    </div>
  )
}

export default SlidingPane
