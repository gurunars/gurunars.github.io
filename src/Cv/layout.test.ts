import type { Item } from '../Item'
import type { Link } from '../Link'
import type { Portfolio } from '../model'
import { buildCv, formatPeriod, printedAddress } from './layout'

const NOW = new Date('2026-11-19T12:00:00Z')

const link = (alias: string, url = `https://${alias}.example`): Link => ({ alias, name: alias, url })

const item = (overrides: Partial<Item> & { start: string; end?: string }): Item => ({
  title: 'Engineer',
  achievements: ['Did the thing.'],
  location: link('employer'),
  references: [],
  type: 'fullTimeJob',
  tags: ['All'],
  description: 'Worked on things.',
  links: [],
  // The model stamps an open-ended item with the moment it was loaded.
  duration: { start: new Date(overrides.start), end: overrides.end ? new Date(overrides.end) : NOW },
  ...overrides,
})

const portfolio = (items: Item[]): Portfolio => ({ links: [], people: [], items })

const section = (items: Item[], title: string) => buildCv(portfolio(items), NOW).sections.find((s) => s.title === title)

describe('formatPeriod', () => {
  it('reads a finished job as a month range', () => {
    expect(formatPeriod({ start: new Date('2022-04-04'), end: new Date('2023-03-31') }, NOW)).toBe(
      'Apr 2022 – Mar 2023',
    )
  })

  it('shows a job without an end date as running to the present, not to today', () => {
    expect(formatPeriod({ start: new Date('2024-11-01'), end: NOW }, NOW)).toBe('Nov 2024 – Present')
  })

  it('does not repeat the month when something started and ended in the same one', () => {
    expect(formatPeriod({ start: new Date('2024-01-04'), end: new Date('2024-01-18') }, NOW)).toBe('Jan 2024')
  })

  // A date is stored as a calendar day; read in local time west of Greenwich
  // the first of the month would slide back into the previous one.
  it('keeps a job that started on the first of a month in that month', () => {
    expect(formatPeriod({ start: new Date('2020-06-01'), end: new Date('2022-04-03') }, NOW)).toBe(
      'Jun 2020 – Apr 2022',
    )
  })
})

describe('buildCv', () => {
  it('lists the newest job first', () => {
    const experience = section(
      [
        item({ title: 'Old', start: '2018-01-15', end: '2019-11-15' }),
        item({ title: 'Current', start: '2024-11-01' }),
        item({ title: 'Middle', start: '2020-06-01', end: '2022-04-03' }),
      ],
      'Experience',
    )
    expect(experience?.entries.map((entry) => entry.title)).toEqual(['Current', 'Middle', 'Old'])
  })

  it('files freelance work under experience alongside full time jobs', () => {
    const experience = section([item({ title: 'Contract', type: 'freelance', start: '2020-01-01' })], 'Experience')
    expect(experience?.entries.map((entry) => entry.title)).toEqual(['Contract'])
  })

  // The CV is generated, not curated: an earlier version dropped the bullet
  // points of anything older than ten years and the course list of every
  // certificate.
  it('keeps every bullet point of a job, however long ago it ended', () => {
    const experience = section([item({ title: 'Ancient', start: '2008-05-19', end: '2008-12-31' })], 'Experience')
    expect(experience?.entries[0].points).toEqual(['Did the thing.'])
  })

  it('lists a certificate in full, with its description and its courses', () => {
    const certificates = section(
      [
        item({
          title: 'Deep Learning',
          type: 'certificate',
          start: '2024-02-18',
          end: '2024-07-20',
          achievements: ['Course one', 'Course two'],
          links: [link('certificate')],
        }),
      ],
      'Certificates',
    )
    expect(certificates?.entries[0]).toMatchObject({
      period: 'Feb 2024 – Jul 2024',
      summary: 'Worked on things.',
      points: ['Course one', 'Course two'],
      links: [link('certificate')],
    })
  })

  it('carries the references of an entry over', () => {
    const experience = section([item({ start: '2020-01-01', references: [link('boss')] })], 'Experience')
    expect(experience?.entries[0].references).toEqual([link('boss')])
  })

  it('leaves out a section that has nothing in it', () => {
    const cv = buildCv(portfolio([item({ start: '2020-01-01' })]), NOW)
    expect(cv.sections.map((s) => s.title)).toEqual(['Experience'])
  })

  it('takes the name, headline and summary from the contact card and keeps the card out of the sections', () => {
    const cv = buildCv(
      portfolio([
        item({
          title: 'Anton',
          type: 'contactCard',
          start: '1989-03-24',
          description: 'Software Engineer.',
          achievements: ['Fluent in English.'],
          logo: '/avatar.jpg',
        }),
      ]),
      NOW,
    )
    expect(cv).toMatchObject({
      name: 'Anton',
      headline: 'Software Engineer.',
      photo: '/avatar.jpg',
      highlights: ['Fluent in English.'],
      sections: [],
    })
  })

  // The contact card carries a "CV" button that points back at this page.
  it('does not print the link to the CV itself among the contacts', () => {
    const cv = buildCv(
      portfolio([
        item({
          type: 'contactCard',
          start: '1989-03-24',
          links: [link('email', 'mailto:me@example.com'), link('cv', '#/cv')],
        }),
      ]),
      NOW,
    )
    expect(cv.contacts.map((contact) => contact.alias)).toEqual(['email'])
  })

  it('lists the skills the site itself offers: used more than once, most used first', () => {
    const cv = buildCv(
      portfolio([
        item({ start: '2020-01-01', tags: ['All', 'Kotlin', 'Python'] }),
        item({ start: '2021-01-01', tags: ['All', 'Kotlin', 'Python'] }),
        item({ start: '2022-01-01', tags: ['All', 'Kotlin', 'Rust'] }),
      ]),
      NOW,
    )
    expect(cv.skills).toEqual(['Kotlin', 'Python'])
  })
})

describe('printedAddress', () => {
  // The link shortener exists for the printed CV: a reader holding paper has
  // to type the address, and nobody types a 70-character one.
  it("prints a page as the short address of the site's link shortener", () => {
    expect(
      printedAddress(
        link('certificate', 'https://www.coursera.org/account/accomplishments/specialization/885GFTXZ9RH5'),
        'gurunars.com',
      ),
    ).toBe('gurunars.com/#/sh/certificate')
  })

  it('prints an email address as it is', () => {
    expect(printedAddress(link('email', 'mailto:someone@example.com'), 'gurunars.com')).toBe('someone@example.com')
  })
})
