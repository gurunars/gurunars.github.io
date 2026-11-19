import type { Item } from '../Item'
import type { Link } from '../Link'
import { ALL, type Portfolio } from '../model'

export interface CvEntry {
  title: string
  organisation?: Link
  period: string
  summary: string
  points: string[]
  links: Link[]
}

export interface CvSection {
  title: string
  // A compact section lists its entries as one-liners.
  compact: boolean
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

// A CV is read in a minute: work older than this keeps its summary and loses
// its bullet points.
export const DETAIL_YEARS = 10

// Only the leading skills fit on a few lines.
export const SKILL_LIMIT = 30

// A skill counts for half as much for every this many years since it was last
// used, so the list leads with current practice instead of the longest habit.
export const SKILL_HALF_LIFE_YEARS = 3

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000

export const rankSkills = (items: Item[], now: Date): string[] => {
  const scores = new Map<string, number>()
  for (const item of items) {
    const idleYears = Math.max(0, now.getTime() - item.duration.end.getTime()) / YEAR_MS
    const weight = 0.5 ** (idleYears / SKILL_HALF_LIFE_YEARS)
    for (const tag of item.tags) {
      if (tag !== ALL) {
        scores.set(tag, (scores.get(tag) ?? 0) + weight)
      }
    }
  }
  // Array.sort is stable: equally scored skills stay in portfolio order.
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag)
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

const isOld = (item: Item, now: Date) => {
  const cutoff = new Date(now)
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - DETAIL_YEARS)
  return item.duration.end.getTime() < cutoff.getTime()
}

const newestFirst = (items: Item[]) =>
  [...items].sort(
    (a, b) =>
      b.duration.start.getTime() - a.duration.start.getTime() || b.duration.end.getTime() - a.duration.end.getTime(),
  )

const detailed =
  (now: Date, keepOldPoints: boolean) =>
  (item: Item): CvEntry => ({
    title: item.title,
    organisation: item.location,
    period: formatPeriod(item.duration, now),
    summary: item.description,
    points: isOld(item, now) && !keepOldPoints ? [] : item.achievements,
    links: item.links,
  })

// A certificate is a title, an issuer, the month it was earned and a link to
// verify it. The course list stays on the site.
const compact =
  (now: Date) =>
  (item: Item): CvEntry => ({
    title: item.title,
    organisation: item.location,
    period: isOngoing(item.duration.end, now) ? 'In progress' : monthOf(item.duration.end),
    summary: '',
    points: [],
    links: item.links,
  })

// A degree is old by nature and is the only entry of its section, so it keeps
// its points whatever its age.
const SECTIONS: { title: string; types: string[]; compact?: boolean; keepOldPoints?: boolean }[] = [
  { title: 'Experience', types: ['fullTimeJob', 'freelance'] },
  { title: 'Patents and Publications', types: ['publication'] },
  { title: 'Open Source', types: ['openSource'] },
  { title: 'Education', types: ['education'], keepOldPoints: true },
  { title: 'Certificates', types: ['certificate'], compact: true },
]

// A link that only works inside the site (the CV button itself) has no place
// on paper.
const isExternal = (link: Link) => !link.url.startsWith('#')

export const buildCv = (portfolio: Portfolio, now: Date): CvDocument => {
  const card = portfolio.items.find((item) => item.type === 'contactCard')

  const sections = SECTIONS.map((spec) => ({
    title: spec.title,
    compact: spec.compact ?? false,
    entries: newestFirst(portfolio.items.filter((item) => spec.types.includes(item.type))).map(
      spec.compact ? compact(now) : detailed(now, spec.keepOldPoints ?? false),
    ),
  })).filter((section) => section.entries.length > 0)

  return {
    name: card?.title ?? '',
    headline: card?.description ?? '',
    photo: card?.logo,
    contacts: (card?.links ?? []).filter(isExternal),
    highlights: card?.achievements ?? [],
    // The contact card's tags are spoken languages, which the summary covers.
    skills: rankSkills(
      portfolio.items.filter((item) => item !== card),
      now,
    ).slice(0, SKILL_LIMIT),
    sections,
  }
}
