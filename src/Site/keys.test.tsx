import { act } from 'react'
import { createRoot } from 'react-dom/client'

import { useBoxState } from '../Box'
import type { Portfolio } from '../model'
import Site from '.'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const PORTFOLIO: Portfolio = {
  links: [],
  people: [],
  items: [
    {
      title: 'Engineer',
      achievements: ['Did the thing.'],
      location: { alias: 'employer', name: 'Employer', url: 'https://employer.example' },
      references: [],
      type: 'fullTimeJob',
      tags: ['All'],
      description: 'Worked on things.',
      links: [],
      duration: { start: new Date('2020-01-01'), end: new Date('2021-01-01') },
    },
  ],
}

const Harness = () => (
  <Site
    portfolio={PORTFOLIO}
    selectedId={useBoxState<number | null>(null)}
    selectedSpecs={useBoxState(['fullTimeJob'])}
    selectedGroup={useBoxState('type')}
    selectedTag={useBoxState('All')}
    menuIsVisible={useBoxState(false)}
  />
)

describe('Site', () => {
  it('opens the details of an entry on a click and closes them again on Escape', () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    act(() => root.render(<Harness />))
    expect(host.querySelector('.carousel')).toBeNull()

    act(() => (host.querySelector('.card-title') as HTMLElement).click())
    expect(host.querySelector('.carousel')).not.toBeNull()

    act(() => void document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })))
    expect(host.querySelector('.carousel')).toBeNull()

    act(() => root.unmount())
  })
})
