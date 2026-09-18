import { icons } from '.'
import { getIconForUrl } from './derive'

describe('getIconForUrl', () => {
  it.each([
    ['mailto:gurunars@gmail.com', 'email'],
    ['skype:gurunars', 'skype'],
    ['#/cv', 'cv'],
    ['https://github.com/gurunars', 'github'],
    ['https://linkedin.com/in/gurunars', 'linkedin'],
    ['https://stackoverflow.com/users/1478655/archibald', 'stackoverflow'],
    ['https://play.google.com/store/apps/details?id=fi.nordea.mep.p2p', 'play'],
    ['https://www.coursera.org/account/accomplishments/specialization/UHXRM7J32ACG', 'coursera'],
    ['http://www.amazon.com/dp/B00YI58B9U', 'amazon'],
    ['http://resource-api.readthedocs.org', 'docs'],
    ['https://nephilim-solutions.github.io/dict-validator/', 'docs'],
  ] as const)('%s -> %s', (url, expected) => {
    expect(getIconForUrl(url)).toBe(icons[expected])
  })

  it('falls back to the generic link icon', () => {
    expect(getIconForUrl('https://homegate.ch/')).toBe(icons.link)
    expect(getIconForUrl(undefined)).toBe(icons.link)
  })
})
