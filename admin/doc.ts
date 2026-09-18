// The portfolio document exactly as stored in public/portfolio.yaml.

export interface DocLink {
  name: string
  alias: string
  url: string
}

export interface DocItem {
  title: string
  type: string
  description?: string
  achievements?: string[]
  logo?: string
  startDate?: string
  endDate?: string
  location?: string
  links?: string[]
  references?: string[]
}

export interface Doc {
  items: DocItem[]
  // Resource links: companies, repos, certificates, apps, contact channels.
  links: DocLink[]
  // People an item's `references` can point at.
  people: DocLink[]
}

export const emptyItem = (): DocItem => ({
  title: 'New entry',
  type: 'fullTimeJob',
  description: '',
  achievements: [],
  startDate: new Date().toISOString().slice(0, 10),
  location: 'self',
})

export const emptyLink = (): DocLink => ({
  name: 'New link',
  alias: 'new-link',
  url: 'https://',
})

export const emptyPerson = (): DocLink => ({
  name: 'New person',
  alias: 'new-person',
  url: 'https://linkedin.com/in/',
})
