import type React from 'react'
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

const columnStyle: React.CSSProperties = {
  height: '100%',
  overflowY: 'auto',
  boxSizing: 'border-box',
}

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
    return <p style={{ padding: 20, color: state.error ? '#a00' : '#444' }}>{statusLine(state)}</p>
  }
  const doc = state.doc
  const item = doc.items[state.itemIndex]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 16,
          padding: '8px 12px 0 12px',
          borderBottom: '2px solid #1b2e3c',
          backgroundColor: '#f7f7f7',
        }}
      >
        <b style={{ paddingBottom: 8 }}>Portfolio admin</b>
        <TabBar
          tabs={[
            { key: 'entries', label: 'Entries' },
            { key: 'links', label: 'Links' },
            { key: 'people', label: 'References' },
          ]}
          active={state.tab}
          onSelect={(tab) => dispatch({ kind: 'selectTab', tab })}
        />
        <span style={{ fontSize: 12, color: state.error ? '#a00' : '#666', marginLeft: 'auto', paddingBottom: 12 }}>
          {statusLine(state)}
        </span>
        <button
          type="button"
          onClick={save}
          disabled={!isDirty(state) || state.status === 'saving'}
          style={{
            padding: '6px 18px',
            marginBottom: 6,
            cursor: 'pointer',
            border: '1px solid #1b2e3c',
            borderRadius: 3,
            backgroundColor: isDirty(state) ? '#1b2e3c' : '#ddd',
            color: isDirty(state) ? 'white' : '#666',
          }}
        >
          Save
        </button>
      </div>

      {state.tab === 'entries' ? (
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <div style={{ ...columnStyle, width: 250, borderRight: '1px solid #ccc' }}>
            <ItemList
              items={doc.items}
              links={doc.links}
              selectedIndex={state.itemIndex}
              onSelect={(index) => dispatch({ kind: 'selectItem', index })}
            />
          </div>

          <div style={{ ...columnStyle, flex: 1, padding: 14 }}>
            {item === undefined ? (
              <p style={{ color: '#666' }}>No entries yet — create one.</p>
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
                  onClick={() => dispatch({ kind: 'deleteItem', index: state.itemIndex })}
                  style={{
                    padding: '6px 18px',
                    cursor: 'pointer',
                    border: '1px solid #a00',
                    borderRadius: 3,
                    backgroundColor: 'white',
                    color: '#a00',
                  }}
                >
                  Delete this entry
                </button>
              </div>
            )}
          </div>

          <div style={{ ...columnStyle, flex: 1, borderLeft: '1px solid #ccc' }}>
            <Preview doc={doc} index={state.itemIndex} />
          </div>
        </div>
      ) : (
        <div style={{ ...columnStyle, flex: 1, minHeight: 0, padding: 14 }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
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
