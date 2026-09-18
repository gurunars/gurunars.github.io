import _ from 'lodash'
import type React from 'react'
import KeyBoardListener from '../KeyBoardListener'

const CursorIcon = (props: {
  icon: React.ReactElement<any>
  keyboardButton: string
  targetPosition: number | null
  goTo: (targetPosition: number) => void
}): React.ReactElement => {
  const dims = 30
  const isEmpty = _.isNil(props.targetPosition)

  const goTo = () => (isEmpty ? null : props.goTo(props.targetPosition || 0))

  return (
    <KeyBoardListener keyBoardKey={props.keyboardButton} onPress={goTo}>
      <div
        onClick={goTo}
        style={{
          position: 'relative',
          color: isEmpty ? 'var(--muted)' : 'var(--text)',
          cursor: isEmpty ? 'not-allowed' : 'pointer',
          width: dims,
          height: dims,
        }}
      >
        {props.icon}
      </div>
    </KeyBoardListener>
  )
}

export default CursorIcon
