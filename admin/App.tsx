import { useEffect, useReducer } from 'react'

import { loadDoc, saveDoc } from './api'
import Fab from './Fab'
import ItemForm from './ItemForm'
import ItemList from './ItemList'
import LinksForm from './LinksForm'
import PeopleForm from './PeopleForm'
import Preview from './Preview'
import { type AdminState, initialState, isDirty, nextState } from './state'
import TabBar from './TabBar'

import './app.css'

const statusLine = (state: AdminState): string => {
  if (state.status === 'loading') {
    return 'Loading…'
  }
  if (state.status === 'saving') {
    return 'Saving…'
  }
  if (state.error) {
    return state.error
  }
  return ''
}

const App = () => {
  const [state, dispatch] = useReducer(nextState, initialState)

  useEffect(() => {
    loadDoc()
      .then((doc) => dispatch({ kind: 'loaded', doc }))
      .catch((err) => dispatch({ kind: 'loadFailed', error: String(err) }))
  }, [])

  const save = () => {
    const doc = state.doc
    if (doc === null || state.status === 'saving') {
      return
    }
    dispatch({ kind: 'saveStarted' })
    saveDoc(doc)
      .then(() => dispatch({ kind: 'saveSucceeded', doc }))
      .catch((err) => dispatch({ kind: 'saveFailed', error: String(err) }))
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        save()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  if (state.doc === null) {
    return (
      <p className="app-loading" data-error={Boolean(state.error)}>
        {statusLine(state)}
      </p>
    )
  }
  const doc = state.doc
  const item = doc.items[state.itemIndex]

  return (
    <div className="app">
      <div className="app-bar">
        <b className="app-title">Portfolio admin</b>
        <TabBar
          tabs={[
            { key: 'entries', label: 'Entries' },
            { key: 'links', label: 'Links' },
            { key: 'people', label: 'References' },
          ]}
          active={state.tab}
          onSelect={(tab) => dispatch({ kind: 'selectTab', tab })}
        />
        <span className="app-status" data-error={Boolean(state.error)}>
          {statusLine(state)}
        </span>
        <button
          type="button"
          className="app-save"
          data-dirty={isDirty(state)}
          onClick={save}
          disabled={!isDirty(state) || state.status === 'saving'}
        >
          Save
        </button>
      </div>

      {state.tab === 'entries' ? (
        <div className="app-columns">
          <div className="app-column app-list">
            <ItemList
              items={doc.items}
              links={doc.links}
              selectedIndex={state.itemIndex}
              onSelect={(index) => dispatch({ kind: 'selectItem', index })}
            />
          </div>

          <div className="app-column app-editor">
            {item === undefined ? (
              <p className="app-empty">No entries yet — create one.</p>
            ) : (
              <div>
                <ItemForm
                  item={item}
                  links={doc.links}
                  people={doc.people}
                  onPatch={(patch) => dispatch({ kind: 'patchItem', index: state.itemIndex, patch })}
                />
                <button
                  type="button"
                  className="app-delete"
                  onClick={() => dispatch({ kind: 'deleteItem', index: state.itemIndex })}
                >
                  Delete this entry
                </button>
              </div>
            )}
          </div>

          <div className="app-column app-preview">
            <Preview doc={doc} index={state.itemIndex} />
          </div>
        </div>
      ) : (
        <div className="app-column app-sheet">
          <div className="app-sheet-body">
            {state.tab === 'links' ? (
              <LinksForm
                links={doc.links}
                onDelete={(index) => dispatch({ kind: 'deleteLink', index })}
                onPatch={(index, patch) => dispatch({ kind: 'patchLink', index, patch })}
              />
            ) : (
              <PeopleForm
                people={doc.people}
                onDelete={(index) => dispatch({ kind: 'deletePerson', index })}
                onPatch={(index, patch) => dispatch({ kind: 'patchPerson', index, patch })}
              />
            )}
          </div>
        </div>
      )}

      <Fab
        title={{ entries: 'New entry', links: 'New link', people: 'New reference' }[state.tab]}
        onClick={() =>
          dispatch(
            state.tab === 'entries'
              ? { kind: 'addItem' }
              : state.tab === 'links'
                ? { kind: 'addLink' }
                : { kind: 'addPerson' },
          )
        }
      />
    </div>
  )
}

export default App
