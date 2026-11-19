import type React from 'react'

import './style.css'

// A page that can have something shown in front of it: a dialog over a dimmed
// page on a wide screen, a full replacement of the page on a narrow one (see
// style.css). The page stays mounted underneath, so it keeps its scroll
// position.
const PageWithOverlay = (props: { children: React.JSX.Element; foregroundContent?: React.JSX.Element | null }) => (
  <div className="overlay-host">
    {props.children}
    {props.foregroundContent && (
      <div className="overlay-backdrop">
        <div className="overlay-dialog">{props.foregroundContent}</div>
      </div>
    )}
  </div>
)

export default PageWithOverlay
