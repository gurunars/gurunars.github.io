import { renderToStaticMarkup } from 'react-dom/server'

import type { Portfolio } from '../model'
import Cv from '.'

const NOW = new Date('2026-11-19T12:00:00Z')

const PORTFOLIO: Portfolio = {
  links: [],
  people: [],
  items: [
    {
      title: 'Anton Berezin',
      logo: '/avatar.jpg',
      achievements: ['15+ years of industry experience.'],
      location: { alias: 'self', name: 'My Company', url: 'http://gurunars.com' },
      references: [],
      type: 'contactCard',
      tags: ['All'],
      description: 'Software Engineer.',
      links: [
        { alias: 'github', name: 'gurunars', url: 'https://github.com/gurunars' },
        { alias: 'email', name: 'someone@example.com', url: 'mailto:someone@example.com' },
      ],
      duration: { start: new Date('1989-03-24'), end: NOW },
    },
    {
      title: 'Patent',
      achievements: ['Covers rendering.'],
      location: { alias: 'google', name: 'Google', url: 'https://google.com' },
      references: [{ alias: 'ref', name: 'Somebody Else', url: 'https://linkedin.com/in/somebody' }],
      type: 'publication',
      tags: ['All'],
      description: 'Named inventor.',
      links: [{ alias: 'patent', name: 'Google Patents', url: 'https://patents.google.com/patent/US12271742B2/en' }],
      duration: { start: new Date('2023-08-04'), end: new Date('2025-04-08') },
    },
  ],
}

const html = renderToStaticMarkup(
  <Cv portfolio={PORTFOLIO} siteAddress="gurunars.com" now={NOW} onPrint={() => undefined} />,
)

describe('Cv', () => {
  // The site's link shortener exists for the printed CV: a reader holding
  // paper has to type the address, and nobody types a 70-character one.
  it('prints the short address of every link, which a reader can type from paper', () => {
    expect(html).toContain('>gurunars.com/#/sh/github</a>')
    expect(html).toContain('>gurunars.com/#/sh/patent</a>')
    expect(html).not.toContain('>patents.google.com/patent/US12271742B2/en</a>')
  })

  it('still points the short address at the real page for whoever reads the PDF', () => {
    expect(html).toContain('href="https://patents.google.com/patent/US12271742B2/en"')
  })

  it('prints an email address as it is, since it is already short and is not a page', () => {
    expect(html).toContain('>someone@example.com</a>')
    expect(html).not.toContain('#/sh/email')
  })

  it('puts each kind of work under its own heading', () => {
    expect(html).toContain('<h2>Summary</h2>')
    expect(html).toContain('<h2>Patents and Publications</h2>')
    expect(html).not.toContain('<h2>Experience</h2>')
  })

  it('prints the references of an entry, each with a short address', () => {
    expect(html).toContain(
      'Reference: Somebody Else: <a href="https://linkedin.com/in/somebody">gurunars.com/#/sh/ref</a>',
    )
  })

  it('offers a way to print the page', () => {
    expect(html).toContain('Print or save as PDF</button>')
  })
})
