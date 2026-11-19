import type { Item } from '../Item'
import type { Link } from '../Link'
import { ALL, getImportantSkills, type Portfolio } from '../model'

// The CV is the portfolio on paper: generated, never curated. Everything an
// entry holds is carried over, and nothing here decides what is worth
// showing. The only choices made are of form: which section a type of entry
// goes under, in what order, and how a date or an address is written.

export interface CvEntry {
  title: string
  organisation?: Link
  period: string
  summary: string
  points: string[]
  links: Link[]
  references: Link[]
}

export interface CvSection {
  title: string
  entries: CvEntry[]
}

export interface CvDocument {
  name: string
  headline: string
  photo?: string
  contacts: Link[]
  highlights: string[]
  skills: string[]
  sections: CvSection[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const DAY_MS = 24 * 60 * 60 * 1000

// Dates in the portfolio are calendar days parsed as UTC midnight, so they are
// read back in UTC to keep the month stable in every time zone.
const monthOf = (date: Date) => `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`

// The model stamps an item without an end date with the moment it was loaded.
const isOngoing = (end: Date, now: Date) => Math.abs(now.getTime() - end.getTime()) < DAY_MS

export const formatPeriod = (duration: { start: Date; end: Date }, now: Date): string => {
  const start = monthOf(duration.start)
  const end = isOngoing(duration.end, now) ? 'Present' : monthOf(duration.end)
  return start === end ? start : `${start} – ${end}`
}

// What to print for a link. A page gets the address of the site's own link
// shortener (#/sh/<alias>), which is short enough to type from paper. An
// email address or a phone number is not a page and is printed as it is.
export const printedAddress = (link: Link, siteAddress: string): string =>
  /^https?:/.test(link.url) ? `${siteAddress}/#/sh/${link.alias}` : link.url.replace(/^[a-z]+:/, '')

const newestFirst = (items: Item[]) =>
  [...items].sort(
    (a, b) =>
      b.duration.start.getTime() - a.duration.start.getTime() || b.duration.end.getTime() - a.duration.end.getTime(),
  )

const SECTIONS: { title: string; types: string[] }[] = [
  { title: 'Experience', types: ['fullTimeJob', 'freelance'] },
  { title: 'Patents and Publications', types: ['publication'] },
  { title: 'Open Source', types: ['openSource'] },
  { title: 'Education', types: ['education'] },
  { title: 'Certificates', types: ['certificate'] },
]

// A link that only works inside the site (the CV button itself) has no place
// on paper.
const isExternal = (link: Link) => !link.url.startsWith('#')

export const buildCv = (portfolio: Portfolio, now: Date): CvDocument => {
  const card = portfolio.items.find((item) => item.type === 'contactCard')

  const entry = (item: Item): CvEntry => ({
    title: item.title,
    organisation: item.location,
    period: formatPeriod(item.duration, now),
    summary: item.description,
    points: item.achievements,
    links: item.links,
    references: item.references,
  })

  return {
    name: card?.title ?? '',
    headline: card?.description ?? '',
    photo: card?.logo,
    contacts: (card?.links ?? []).filter(isExternal),
    highlights: card?.achievements ?? [],
    // The same list the site's own skill filter offers.
    skills: Object.keys(getImportantSkills(portfolio)).filter((skill) => skill !== ALL),
    sections: SECTIONS.map((spec) => ({
      title: spec.title,
      entries: newestFirst(portfolio.items.filter((item) => spec.types.includes(item.type))).map(entry),
    })).filter((section) => section.entries.length > 0),
  }
}
