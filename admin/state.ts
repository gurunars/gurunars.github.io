import { type Doc, type DocItem, type DocLink, emptyItem, emptyLink, emptyPerson } from './doc'

export type Tab = 'entries' | 'links' | 'people'

export interface AdminState {
  // The document being edited — the single source; everything else on screen
  // (preview, dirty flag) is derived from it.
  doc: Doc | null
  // Snapshot of the last loaded/saved document, for the dirty check.
  saved: Doc | null
  tab: Tab
  itemIndex: number
  status: 'loading' | 'ready' | 'saving' | 'load-failed' | 'save-failed'
  error: string | null
}

export const initialState: AdminState = {
  doc: null,
  saved: null,
  tab: 'entries',
  itemIndex: 0,
  status: 'loading',
  error: null,
}

export type AdminEvent =
  | { kind: 'loaded'; doc: Doc }
  | { kind: 'loadFailed'; error: string }
  | { kind: 'selectTab'; tab: Tab }
  | { kind: 'selectItem'; index: number }
  | { kind: 'addItem' }
  | { kind: 'deleteItem'; index: number }
  | { kind: 'patchItem'; index: number; patch: Partial<DocItem> }
  | { kind: 'addLink' }
  | { kind: 'deleteLink'; index: number }
  | { kind: 'patchLink'; index: number; patch: Partial<DocLink> }
  | { kind: 'addPerson' }
  | { kind: 'deletePerson'; index: number }
  | { kind: 'patchPerson'; index: number; patch: Partial<DocLink> }
  | { kind: 'saveStarted' }
  | { kind: 'saveSucceeded'; doc: Doc }
  | { kind: 'saveFailed'; error: string }

export const isDirty = (state: AdminState): boolean =>
  state.doc !== null && JSON.stringify(state.doc) !== JSON.stringify(state.saved)

const withDoc = (state: AdminState, change: (doc: Doc) => Doc): AdminState =>
  state.doc === null ? state : { ...state, doc: change(state.doc) }

const replaceAt = <T>(list: T[], index: number, value: T): T[] =>
  list.map((it, position) => (position === index ? value : it))

const removeAt = <T>(list: T[], index: number): T[] => list.filter((_, position) => position !== index)

export const nextState = (state: AdminState, event: AdminEvent): AdminState => {
  switch (event.kind) {
    case 'loaded':
      return {
        ...state,
        doc: event.doc,
        saved: event.doc,
        status: 'ready',
        error: null,
        tab: 'entries',
        itemIndex: 0,
      }
    case 'loadFailed':
      return { ...state, status: 'load-failed', error: event.error }
    case 'selectTab':
      return { ...state, tab: event.tab }
    case 'selectItem':
      return { ...state, itemIndex: event.index }
    case 'addItem': {
      const added = withDoc(state, (doc) => ({ ...doc, items: [emptyItem(), ...doc.items] }))
      return { ...added, itemIndex: 0 }
    }
    case 'deleteItem': {
      const removed = withDoc(state, (doc) => ({ ...doc, items: removeAt(doc.items, event.index) }))
      const remaining = removed.doc?.items.length || 0
      return { ...removed, itemIndex: Math.max(0, Math.min(state.itemIndex, remaining - 1)) }
    }
    case 'patchItem':
      return withDoc(state, (doc) => ({
        ...doc,
        items: replaceAt(doc.items, event.index, { ...doc.items[event.index], ...event.patch }),
      }))
    case 'addLink':
      return withDoc(state, (doc) => ({ ...doc, links: [emptyLink(), ...doc.links] }))
    case 'deleteLink':
      return withDoc(state, (doc) => ({ ...doc, links: removeAt(doc.links, event.index) }))
    case 'patchLink':
      return withDoc(state, (doc) => ({
        ...doc,
        links: replaceAt(doc.links, event.index, { ...doc.links[event.index], ...event.patch }),
      }))
    case 'addPerson':
      return withDoc(state, (doc) => ({ ...doc, people: [emptyPerson(), ...doc.people] }))
    case 'deletePerson':
      return withDoc(state, (doc) => ({ ...doc, people: removeAt(doc.people, event.index) }))
    case 'patchPerson':
      return withDoc(state, (doc) => ({
        ...doc,
        people: replaceAt(doc.people, event.index, { ...doc.people[event.index], ...event.patch }),
      }))
    case 'saveStarted':
      return { ...state, status: 'saving', error: null }
    case 'saveSucceeded':
      return { ...state, saved: event.doc, status: 'ready', error: null }
    case 'saveFailed':
      return { ...state, status: 'save-failed', error: event.error }
    default: {
      const impossible: never = event
      return impossible
    }
  }
}
