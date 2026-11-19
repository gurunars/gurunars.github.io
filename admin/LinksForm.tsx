import { getIconForUrl } from '../src/Link/icons/derive'
import type { DocLink } from './doc'

import './rows.css'

// The icon is not editable: it is derived from the URL (see derive.ts), so
// each row just previews what the site will show.
const DerivedIcon = ({ url }: { url: string }) => {
  const Icon = getIconForUrl(url)
  return (
    <span className="rows-icon" title="Icon derived from the URL">
      <Icon />
    </span>
  )
}

const LinksForm = (props: {
  links: DocLink[]
  onPatch: (index: number, patch: Partial<DocLink>) => void
  onDelete: (index: number) => void
}) => (
  <div>
    {props.links.map((link, index) => (
      <div key={index} className="rows-row">
        <DerivedIcon url={link.url} />
        <input
          className="rows-input"
          value={link.alias}
          placeholder="alias"
          onChange={(e) => props.onPatch(index, { alias: e.target.value })}
        />
        <input
          className="rows-input"
          value={link.name}
          placeholder="name"
          onChange={(e) => props.onPatch(index, { name: e.target.value })}
        />
        <input
          className="rows-input"
          data-wide
          value={link.url}
          placeholder="url"
          onChange={(e) => props.onPatch(index, { url: e.target.value })}
        />
        <button type="button" className="rows-delete" title="Delete link" onClick={() => props.onDelete(index)}>
          ✕
        </button>
      </div>
    ))}
  </div>
)

export default LinksForm
