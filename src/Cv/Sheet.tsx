import type React from 'react'

import './sheet.css'

// The pieces of a paper document: a sheet, a masthead, titled sections and
// dated entries. They know nothing about what the document is about.

export interface Anchor {
  label: string
  url: string
}

// The address as it should read on paper, where nobody can click it.
export const printedAddress = (url: string) =>
  url
    .replace(/^mailto:/, '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')

export const Sheet = (props: { actions?: React.ReactNode; children: React.ReactNode }) => (
  <div className="sheet-backdrop">
    {props.actions && <div className="sheet-actions">{props.actions}</div>}
    <article className="sheet">{props.children}</article>
  </div>
)

export const Masthead = (props: {
  name: string
  headline: string
  photo?: string
  contacts: Anchor[]
  children?: React.ReactNode
}) => (
  <header className="sheet-masthead">
    <div className="sheet-masthead-text">
      <h1>{props.name}</h1>
      <p className="sheet-headline">{props.headline}</p>
      <ul className="sheet-contacts">
        {props.contacts.map((contact) => (
          <li key={contact.url}>
            <a href={contact.url}>{printedAddress(contact.url)}</a>
          </li>
        ))}
      </ul>
      {props.children}
    </div>
    {props.photo && <img className="sheet-photo" alt={props.name} src={props.photo} />}
  </header>
)

export const Section = (props: { title: string; children: React.ReactNode }) => (
  <section className="sheet-section">
    <h2>{props.title}</h2>
    {props.children}
  </section>
)

export const Points = (props: { points: string[] }) => (
  <ul className="sheet-points">
    {props.points.map((point) => (
      <li key={point}>{point}</li>
    ))}
  </ul>
)

export const Entry = (props: {
  title: string
  origin?: Anchor
  period: string
  summary?: string
  points: string[]
  links: Anchor[]
}) => (
  <div className="sheet-entry">
    <div className="sheet-entry-intro">
      <div className="sheet-entry-head">
        <h3>
          {props.title}
          {props.origin && (
            <span className="sheet-origin">
              {' · '}
              <a href={props.origin.url}>{props.origin.label}</a>
            </span>
          )}
        </h3>
        <span className="sheet-period">{props.period}</span>
      </div>
      {props.summary && <p className="sheet-summary">{props.summary}</p>}
    </div>
    {props.points.length > 0 && <Points points={props.points} />}
    {props.links.length > 0 && (
      <ul className="sheet-links">
        {props.links.map((link) => (
          <li key={link.url}>
            {link.label && `${link.label}: `}
            <a href={link.url}>{printedAddress(link.url)}</a>
          </li>
        ))}
      </ul>
    )}
  </div>
)
