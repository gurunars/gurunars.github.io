import type React from 'react'

import type { Link } from '../Link'
import type { Portfolio } from '../model'
import { buildCv } from './layout'
import { type Anchor, Entry, Masthead, Points, Section, Sheet } from './Sheet'

const anchor = (link: Link): Anchor => ({ label: link.name, url: link.url })

const Cv = (props: { portfolio: Portfolio; now?: Date; onPrint?: () => void }): React.ReactElement<any> => {
  const cv = buildCv(props.portfolio, props.now ?? new Date())
  return (
    <Sheet
      actions={
        <>
          <a href="#/portfolio">Back to the portfolio</a>
          {props.onPrint && (
            <button type="button" onClick={props.onPrint}>
              Print or save as PDF
            </button>
          )}
        </>
      }
    >
      <Masthead name={cv.name} headline={cv.headline} photo={cv.photo} contacts={cv.contacts.map(anchor)} />
      {cv.highlights.length > 0 && (
        <Section title="Summary">
          <Points points={cv.highlights} />
        </Section>
      )}
      {cv.skills.length > 0 && (
        <Section title="Skills">
          <p className="sheet-skills">{cv.skills.join(' · ')}</p>
        </Section>
      )}
      {cv.sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.entries.map((entry) => (
            <Entry
              key={`${entry.title}:${entry.period}`}
              title={entry.title}
              origin={entry.organisation && anchor(entry.organisation)}
              period={entry.period}
              summary={entry.summary}
              points={entry.points}
              // A one-liner's link is the proof of its own title: no label needed.
              links={entry.links.map((link) => (section.compact ? { label: '', url: link.url } : anchor(link)))}
            />
          ))}
        </Section>
      ))}
    </Sheet>
  )
}

export default Cv
