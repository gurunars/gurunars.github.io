import type React from 'react'

// A labelled form row.
const Field = (props: { label: string; children: React.ReactNode }) => (
  <label style={{ display: 'block', marginBottom: 12 }}>
    <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4, color: '#444' }}>{props.label}</div>
    {props.children}
  </label>
)

export default Field
