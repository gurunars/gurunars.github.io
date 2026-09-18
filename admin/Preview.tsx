import React from 'react'

import { Large } from '../src/Item'
import preprocess from '../src/model'
import type { Doc } from './doc'

// The raw document may be mid-edit; never let a preview crash take down the
// editor.
class Boundary extends React.Component<{ children: React.ReactNode; resetKey: string }, { failed: boolean }> {
  public state = { failed: false }

  public static getDerivedStateFromError() {
    return { failed: true }
  }

  public componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false })
    }
  }

  public render() {
    return this.state.failed ? (
      <p style={{ padding: 20, color: '#a00' }}>Preview unavailable for the current document state.</p>
    ) : (
      this.props.children
    )
  }
}

// Renders the selected entry exactly as its section appears in the CV.
const Preview = (props: { doc: Doc; index: number }) => {
  const item = preprocess(props.doc).items[props.index]
  return item === undefined ? null : (
    <Boundary resetKey={JSON.stringify([props.doc, props.index])}>
      <div style={{ padding: 10 }}>
        <Large item={item} />
      </div>
    </Boundary>
  )
}

export default Preview
