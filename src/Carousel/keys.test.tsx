import { act } from 'react'
import { createRoot } from 'react-dom/client'

import Carousel from '.'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const press = (key: string) => act(() => void document.dispatchEvent(new KeyboardEvent('keydown', { key })))

const mount = (close: () => void, goTo: (position: number) => void) => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  act(() =>
    root.render(
      <Carousel size={3} selectedPosition={1} close={close} goTo={goTo}>
        {(position) => <p>{position}</p>}
      </Carousel>,
    ),
  )
  return () => act(() => root.unmount())
}

describe('Carousel', () => {
  it('closes the details view when Escape is pressed', () => {
    const close = vi.fn()
    const unmount = mount(close, vi.fn())
    press('Escape')
    expect(close).toHaveBeenCalledTimes(1)
    unmount()
  })

  it('moves to the neighbouring entries with the arrow keys', () => {
    const goTo = vi.fn()
    const unmount = mount(vi.fn(), goTo)
    press('ArrowRight')
    press('ArrowLeft')
    expect(goTo.mock.calls).toEqual([[2], [0]])
    unmount()
  })

  it('stops listening to the keyboard once it is closed', () => {
    const close = vi.fn()
    mount(close, vi.fn())()
    press('Escape')
    expect(close).not.toHaveBeenCalled()
  })
})
