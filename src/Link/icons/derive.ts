import { icons } from '.'

// The icon is derived from the URL rather than stored as data: first matching
// rule wins, unknown URLs get the generic link glyph.
const RULES: [RegExp, keyof typeof icons][] = [
  [/^mailto:/, 'email'],
  [/^skype:/, 'skype'],
  [/^tel:/, 'phone'],
  [/#\/cv$/, 'cv'],
  [/github\.com/, 'github'],
  [/linkedin\.com/, 'linkedin'],
  [/stackoverflow\.com/, 'stackoverflow'],
  [/play\.google\.com/, 'play'],
  [/coursera\.org/, 'coursera'],
  [/amazon\.com|amzn\./, 'amazon'],
  [/readthedocs\.|github\.io/, 'docs'],
  [/\.pdf($|\?)/, 'pdf'],
]

export const getIconForUrl = (url?: string) => {
  const subject = (url || '').toLowerCase()
  const match = RULES.find(([pattern]) => pattern.test(subject))
  return icons[match ? match[1] : 'link']
}
