import type { Item } from '../Item'
import type { Link } from '../Link'
import type { Portfolio } from '../model'
import { buildCv, formatPeriod } from './layout'

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

  // Fifteen years of bullet points make a CV nobody finishes: old work keeps
  // its one-paragraph summary only.
  it('keeps the bullet points of a recent job and drops them for one that ended over ten years ago', () => {
    const experience = section(
      [
        item({ title: 'Recent', start: '2015-07-01', end: '2017-05-12' }),
        item({ title: 'Ancient', start: '2010-03-01', end: '2011-07-15' }),
      ],
      'Experience',
    )
    const [recent, ancient] = experience?.entries ?? []
    expect(recent.points).toEqual(['Did the thing.'])
    expect(ancient.points).toEqual([])
    expect(ancient.summary).toBe('Worked on things.')
  })

  it('lists a certificate by the month it was earned, without its course list', () => {
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
    expect(certificates?.entries).toEqual([
      {
        title: 'Deep Learning',
        organisation: link('employer'),
        period: 'Jul 2024',
        summary: '',
        points: [],
        links: [link('certificate')],
      },
    ])
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

  // Ranked by frequency alone the list led with habits of a decade ago (Scrum,
  // UML) and never reached what the current job is about.
  it('leads the skills with what is in use today, ahead of an old habit used more often', () => {
    const cv = buildCv(
      portfolio([
        item({ start: '2010-01-01', end: '2011-01-01', tags: ['All', 'UML'] }),
        item({ start: '2011-01-01', end: '2012-01-01', tags: ['All', 'UML'] }),
        item({ start: '2012-01-01', end: '2013-01-01', tags: ['All', 'UML'] }),
        item({ start: '2024-11-01', tags: ['All', 'gRPC'] }),
      ]),
      NOW,
    )
    expect(cv.skills).toEqual(['gRPC', 'UML'])
  })

  it('ranks a skill used in two current jobs above one used in a single current job', () => {
    const cv = buildCv(
      portfolio([
        item({ start: '2024-11-01', tags: ['All', 'gRPC', 'Kotlin'] }),
        item({ start: '2023-01-01', tags: ['All', 'Kotlin'] }),
      ]),
      NOW,
    )
    expect(cv.skills).toEqual(['Kotlin', 'gRPC'])
  })

  it('does not list the spoken languages tagged on the contact card as skills', () => {
    const cv = buildCv(
      portfolio([
        item({ type: 'contactCard', start: '1989-03-24', tags: ['All', 'English'] }),
        item({ start: '2024-11-01', tags: ['All', 'Kotlin'] }),
      ]),
      NOW,
    )
    expect(cv.skills).toEqual(['Kotlin'])
  })

  it('keeps the details of a degree however long ago it was earned', () => {
    const education = section(
      [item({ title: 'Degree', type: 'education', start: '2006-08-23', end: '2010-01-29' })],
      'Education',
    )
    expect(education?.entries[0].points).toEqual(['Did the thing.'])
  })
})
