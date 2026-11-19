import type React from 'react'

import './field.css'

// A labelled form row.
const Field = (props: { label: string; children: React.ReactNode }) => (
  <label className="field">
    <div className="field-label">{props.label}</div>
    {props.children}
  </label>
)

export default Field
