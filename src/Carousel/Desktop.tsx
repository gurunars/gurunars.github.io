import type React from 'react'

import KeyBoardListener from '../KeyBoardListener'
import { FullSize } from '../Layouts'
import { type Cursor, getCursorItems } from './Cursor'
import CursorIcon from './CursorIcon'
import Close from './icons/close.svg?react'
import Next from './icons/next.svg?react'
import Prev from './icons/prev.svg?react'
import type Props from './Props'
import SlidingPane from './SlidingPane'

const Carousel = (props: Props): React.ReactElement<any> => {
  const cursor: Cursor = getCursorItems(props.size, props.selectedPosition)

  const dims = 15
  const controlsWidth = 50

  const controlsStyle: React.CSSProperties = {
    float: 'left',
    width: controlsWidth,
    height: '100%',
    overflow: 'hidden',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }

  const mainAreaStyle: React.CSSProperties = {
    float: 'left',
    width: `calc(100% - ${controlsWidth * 2}px)`,
    height: '100%',
    overflow: 'hidden',
  }

  return (
    <FullSize>
      <div style={controlsStyle}>
        <CursorIcon keyboardButton="ArrowLeft" icon={<Prev />} targetPosition={cursor.previous} goTo={props.goTo} />
      </div>

      <div style={mainAreaStyle}>
        <SlidingPane position={cursor.current || 0} background="var(--surface)" render={props.children} />
      </div>

      <div style={controlsStyle}>
        <CursorIcon keyboardButton="ArrowRight" icon={<Next />} targetPosition={cursor.next} goTo={props.goTo} />
      </div>

      <KeyBoardListener keyBoardKey="Escape" onPress={props.close}>
        <div
          onClick={props.close}
          style={{
            position: 'absolute',
            display: 'flex',
            color: 'var(--text)',
            cursor: 'pointer',
            top: 10,
            right: 10,
            width: dims * 2,
            height: dims * 2,
          }}
        >
          <Close />
        </div>
      </KeyBoardListener>
    </FullSize>
  )
}

export default Carousel
