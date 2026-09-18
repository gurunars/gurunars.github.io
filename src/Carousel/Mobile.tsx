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
  const controlsSize = 50

  const controlsStyle: React.CSSProperties = {
    width: controlsSize,
    height: controlsSize,
    padding: 10,
  }

  const mainAreaStyle: React.CSSProperties = {
    width: '100%',
    height: `calc(100% - ${controlsSize}px)`,
  }

  return (
    <FullSize>
      <div style={mainAreaStyle}>
        <SlidingPane position={cursor.current || 0} render={props.children} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          width: '100%',
          backgroundColor: 'var(--surface)',
          height: controlsSize,
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={controlsStyle}>
          <CursorIcon keyboardButton="ArrowLeft" icon={<Prev />} targetPosition={cursor.previous} goTo={props.goTo} />
        </div>

        <KeyBoardListener keyBoardKey="Escape" onPress={props.close}>
          <div style={controlsStyle}>
            <div
              onClick={props.close}
              style={{
                cursor: 'pointer',
                color: 'var(--text)',
                width: dims * 2,
                height: dims * 2,
              }}
            >
              <Close />
            </div>
          </div>
        </KeyBoardListener>

        <div style={controlsStyle}>
          <CursorIcon keyboardButton="ArrowRight" icon={<Next />} targetPosition={cursor.next} goTo={props.goTo} />
        </div>
      </div>
    </FullSize>
  )
}

export default Carousel
