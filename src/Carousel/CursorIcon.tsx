import type React from 'react'

import KeyBoardListener from '../KeyBoardListener'

import './cursorIcon.css'

// A control that moves to a position, by click or by key. With nowhere to go
// it is shown disabled and does nothing.
const CursorIcon = (props: {
  icon: React.ReactElement<any>
  keyboardButton: string
  targetPosition: number | null
  goTo: (targetPosition: number) => void
}): React.ReactElement => {
  const target = props.targetPosition
  const goTo = () => (target === null ? null : props.goTo(target))

  return (
    <KeyBoardListener keyBoardKey={props.keyboardButton} onPress={goTo}>
      <div className="cursor-icon" data-disabled={target === null} onClick={goTo}>
        {props.icon}
      </div>
    </KeyBoardListener>
  )
}

export default CursorIcon
