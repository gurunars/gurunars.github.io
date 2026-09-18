import type { Doc } from './doc'
import { type AdminEvent, initialState, isDirty, nextState } from './state'

const doc: Doc = {
  items: [
    { title: 'First', type: 'fullTimeJob' },
    { title: 'Second', type: 'openSource' },
  ],
  links: [{ name: 'Self', alias: 'self', url: 'https://example.com' }],
  people: [{ name: 'Jane Doe', alias: 'jane', url: 'https://linkedin.com/in/jane' }],
}

const sequence = (...events: AdminEvent[]) => events.reduce(nextState, initialState)

describe('admin reducer', () => {
  it('opens the entries tab on the first item once the document is loaded', () => {
    const state = sequence({ kind: 'loaded', doc })
    expect(state.tab).toBe('entries')
    expect(state.itemIndex).toBe(0)
    expect(isDirty(state)).toBe(false)
  })

  it('switches tabs without touching the item selection', () => {
    const state = sequence(
      { kind: 'loaded', doc },
      { kind: 'selectItem', index: 1 },
      { kind: 'selectTab', tab: 'links' },
      { kind: 'selectTab', tab: 'entries' },
    )
    expect(state.itemIndex).toBe(1)
  })

  it('adds a new entry at the top and selects it', () => {
    const state = sequence({ kind: 'loaded', doc }, { kind: 'selectItem', index: 1 }, { kind: 'addItem' })
    expect(state.doc?.items[0].title).toBe('New entry')
    expect(state.doc?.items[1].title).toBe('First')
    expect(state.itemIndex).toBe(0)
    expect(isDirty(state)).toBe(true)
  })

  it('patches only the addressed item', () => {
    const state = sequence(
      { kind: 'loaded', doc },
      { kind: 'addItem' },
      { kind: 'patchItem', index: 1, patch: { title: 'Renamed' } },
    )
    expect(state.doc?.items[0].title).toBe('New entry')
    expect(state.doc?.items[1].title).toBe('Renamed')
  })

  it('keeps the selection on a valid entry after deleting the last one', () => {
    const state = sequence({ kind: 'loaded', doc }, { kind: 'selectItem', index: 1 }, { kind: 'deleteItem', index: 1 })
    expect(state.doc?.items.length).toBe(1)
    expect(state.itemIndex).toBe(0)
  })

  it('becomes clean again after deleting the entry that was added', () => {
    const state = sequence({ kind: 'loaded', doc }, { kind: 'addItem' }, { kind: 'deleteItem', index: 0 })
    expect(isDirty(state)).toBe(false)
  })

  it('is clean after a successful save of the edited document', () => {
    const edited = sequence({ kind: 'loaded', doc }, { kind: 'patchItem', index: 0, patch: { title: 'Changed' } })
    expect(isDirty(edited)).toBe(true)
    const savedDoc = edited.doc as Doc
    const state = [
      { kind: 'saveStarted' } as AdminEvent,
      { kind: 'saveSucceeded', doc: savedDoc } as AdminEvent,
    ].reduce(nextState, edited)
    expect(isDirty(state)).toBe(false)
    expect(state.status).toBe('ready')
  })

  it('patches and deletes links', () => {
    const state = sequence(
      { kind: 'loaded', doc },
      { kind: 'addLink' },
      { kind: 'patchLink', index: 0, patch: { alias: 'github', url: 'https://github.com/gurunars' } },
      { kind: 'deleteLink', index: 1 },
    )
    expect(state.doc?.links).toEqual([{ name: 'New link', alias: 'github', url: 'https://github.com/gurunars' }])
  })

  it('adds, patches and deletes people independently of links', () => {
    const state = sequence(
      { kind: 'loaded', doc },
      { kind: 'addPerson' },
      { kind: 'patchPerson', index: 0, patch: { alias: 'john', name: 'John Roe' } },
      { kind: 'deletePerson', index: 1 },
    )
    expect(state.doc?.people).toEqual([{ name: 'John Roe', alias: 'john', url: 'https://linkedin.com/in/' }])
    expect(state.doc?.links).toEqual(doc.links)
  })
})
