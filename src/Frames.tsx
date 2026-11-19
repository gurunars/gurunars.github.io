import type React from 'react'

import './frames.css'

// Story helpers: show a view the way it looks on a wide page and on a phone.
// Layouts respond to the width of the nearest `page` container (see
// theme.css), so a frame only has to be one of the right width.
const frame = (kind: 'desktop' | 'mobile') =>
  function Frame(children: React.ReactElement): React.ReactElement {
    return (
      <div className="frame">
        <div className="frame-page" data-kind={kind}>
          {children}
        </div>
      </div>
    )
  }

export const desktopFrame = frame('desktop')

export const mobileFrame = frame('mobile')
