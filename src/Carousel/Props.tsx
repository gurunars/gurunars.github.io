import type React from 'react'

export default interface Props {
  size: number
  selectedPosition: number
  children: (pos: number) => React.ReactElement<any>
  close: () => void
  goTo: (targetPosition: number) => void
}
