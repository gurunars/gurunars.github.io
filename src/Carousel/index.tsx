import type React from 'react'

import KeyBoardListener from '../KeyBoardListener'
import { getCursorItems } from './Cursor'
import CursorIcon from './CursorIcon'
import Close from './icons/close.svg?react'
import Next from './icons/next.svg?react'
import Prev from './icons/prev.svg?react'
import SlidingPane from './SlidingPane'

import './style.css'

interface Props {
  size: number
  selectedPosition: number
  children: (pos: number) => React.ReactElement<any>
  close: () => void
  goTo: (targetPosition: number) => void
}

// One pane at a time with previous, next and close controls. Where the
// controls sit (beside the pane on a wide page, in a bar under it on a narrow
// one) is decided in style.css.
const Carousel = (props: Props): React.ReactElement<any> => {
  const cursor = getCursorItems(props.size, props.selectedPosition)

  return (
    <div className="carousel">
      <div className="carousel-prev">
        <CursorIcon keyboardButton="ArrowLeft" icon={<Prev />} targetPosition={cursor.previous} goTo={props.goTo} />
      </div>

      <div className="carousel-pane">
        <SlidingPane position={cursor.current || 0} render={props.children} />
      </div>

      <div className="carousel-next">
        <CursorIcon keyboardButton="ArrowRight" icon={<Next />} targetPosition={cursor.next} goTo={props.goTo} />
      </div>

      <KeyBoardListener keyBoardKey="Escape" onPress={props.close}>
        <div className="carousel-close" onClick={props.close}>
          <Close />
        </div>
      </KeyBoardListener>
    </div>
  )
}

export default Carousel
