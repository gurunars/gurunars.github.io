import { extractTags, normaliseTag } from './model'

describe('extractTags', () => {
  it('should extract and reformat both the curly wrapped and plain tags', () => {
    expect(extractTags('one #{two} #{three four} five #six seven')).toEqual([
      'one two three four five six seven',
      ['two', 'three four', 'six'],
    ])
  })

  it('should include extra hashes into the tag value', () => {
    expect(extractTags('one ###hash')).toEqual(['one ##hash', ['##hash']])
  })

  it('should include extra left curly parentheses', () => {
    expect(extractTags('one #{{{foo}')).toEqual(['one {{foo', ['{{foo']])
  })

  it('should exclude extra right curly parentheses', () => {
    expect(extractTags('one #{foo}}}}')).toEqual(['one foo}}}', ['foo']])
  })

  it('should include the whole string if the end is unbalanced', () => {
    expect(extractTags('one #{foo')).toEqual(['one foo', ['foo']])
  })
})

describe('normaliseTag', () => {
  // The skill list once read "Java Script" and "Type Script".
  it('keeps the capitals inside a product name such as JavaScript', () => {
    expect(normaliseTag('JavaScript')).toBe('JavaScript')
    expect(normaliseTag('CoreMedia CMS')).toBe('CoreMedia CMS')
    expect(normaliseTag('iOS')).toBe('iOS')
    expect(normaliseTag('gRPC')).toBe('gRPC')
  })

  it('files differently written spellings of a skill under one tag', () => {
    expect(normaliseTag('open-source')).toBe('Open Source')
    expect(normaliseTag('infrastructure as code')).toBe('Infrastructure As Code')
  })

  it('does not make a separate tag out of one that ended a sentence', () => {
    expect(normaliseTag('Kotlin,')).toBe('Kotlin')
    expect(normaliseTag('Python.')).toBe('Python')
  })
})
