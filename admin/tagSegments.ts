// Splits text into plain and tag segments following the same grammar as
// src/model.tsx extractTags: '#word' up to whitespace, '#{spanning words}' up
// to the closing brace (or the end of the text).

export interface Segment {
  text: string
  isTag: boolean
}

export const tagSegments = (text: string): Segment[] => {
  const segments: Segment[] = []
  const push = (chunk: string, isTag: boolean) => {
    if (chunk.length === 0) {
      return
    }
    const last = segments[segments.length - 1]
    if (last && last.isTag === isTag) {
      last.text += chunk
    } else {
      segments.push({ text: chunk, isTag })
    }
  }

  let cursor = 0
  while (cursor < text.length) {
    const hash = text.indexOf('#', cursor)
    if (hash === -1) {
      push(text.slice(cursor), false)
      break
    }
    push(text.slice(cursor, hash), false)
    const next = text[hash + 1]
    if (next === undefined || /\s/.test(next)) {
      push('#', false)
      cursor = hash + 1
    } else if (next === '{') {
      const close = text.indexOf('}', hash + 2)
      const end = close === -1 ? text.length : close + 1
      push(text.slice(hash, end), true)
      cursor = end
    } else {
      const match = text.slice(hash + 1).match(/\s/)
      const end = match?.index === undefined ? text.length : hash + 1 + match.index
      push(text.slice(hash, end), true)
      cursor = end
    }
  }
  return segments
}
