import type React from 'react'

import KeyBoardListener from '../KeyBoardListener'
import type { Link } from '../Link'
import type { Portfolio } from '../model'
import { buildCv, printedAddress } from './layout'
import { type Anchor, Entry, Masthead, Points, Section, Sheet } from './Sheet'

// `siteAddress` is where the site is served (gurunars.com): the printed
// addresses go through its link shortener.
const Cv = (props: {
  portfolio: Portfolio
  siteAddress: string
  now?: Date
  onPrint?: () => void
  onClose?: () => void
}): React.ReactElement<any> => {
  const cv = buildCv(props.portfolio, props.now ?? new Date())
  const anchor = (link: Link): Anchor => ({
    label: link.name,
    url: link.url,
    address: printedAddress(link, props.siteAddress),
  })
  return (
    <KeyBoardListener keyBoardKey="Escape" onPress={() => props.onClose?.()}>
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
                links={entry.links.map(anchor)}
                references={entry.references.map(anchor)}
              />
            ))}
          </Section>
        ))}
      </Sheet>
    </KeyBoardListener>
  )
}

export default Cv
