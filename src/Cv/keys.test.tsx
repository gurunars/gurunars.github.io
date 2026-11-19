import { act } from 'react'
import { createRoot } from 'react-dom/client'

import type { Portfolio } from '../model'
import Cv from '.'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const EMPTY: Portfolio = { links: [], people: [], items: [] }

describe('Cv', () => {
  it('closes when Escape is pressed, like the details view of an entry does', () => {
    const onClose = vi.fn()
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    act(() => root.render(<Cv portfolio={EMPTY} siteAddress="example.com" onClose={onClose} />))

    act(() => void document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })))

    expect(onClose).toHaveBeenCalledTimes(1)
    act(() => root.unmount())
  })
})
