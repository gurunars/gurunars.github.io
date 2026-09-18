import { dump, load } from 'js-yaml'

import type { Doc } from './doc'

const API = '/api/portfolio'

export const loadDoc = async (): Promise<Doc> => {
  const response = await fetch(API)
  if (!response.ok) {
    throw new Error(`GET ${API} -> ${response.status}`)
  }
  return load(await response.text()) as Doc
}

export const saveDoc = async (doc: Doc): Promise<void> => {
  const response = await fetch(API, {
    method: 'PUT',
    headers: { 'Content-Type': 'text/yaml' },
    body: dump(doc),
  })
  if (!response.ok) {
    throw new Error(`PUT ${API} -> ${response.status}: ${await response.text()}`)
  }
}
