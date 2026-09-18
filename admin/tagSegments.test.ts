import { tagSegments } from './tagSegments'

describe('tagSegments', () => {
  it('marks word and braced tags, leaving surrounding text plain', () => {
    expect(tagSegments('one #{two three} four #five six')).toEqual([
      { text: 'one ', isTag: false },
      { text: '#{two three}', isTag: true },
      { text: ' four ', isTag: false },
      { text: '#five', isTag: true },
      { text: ' six', isTag: false },
    ])
  })

  it('treats a hash before whitespace or at the end as plain text', () => {
    expect(tagSegments('a # b #')).toEqual([{ text: 'a # b #', isTag: false }])
  })

  it('extends an unterminated braced tag to the end of the text', () => {
    expect(tagSegments('start #{unfinished tag')).toEqual([
      { text: 'start ', isTag: false },
      { text: '#{unfinished tag', isTag: true },
    ])
  })

  it('reassembles the original text exactly', () => {
    const text = 'Employed #RabbitMQ and #{integration testing} daily # yes'
    expect(
      tagSegments(text)
        .map((seg) => seg.text)
        .join(''),
    ).toBe(text)
  })
})
