import { getIconForUrl } from './icons/derive'

import './style.css'

export interface Link {
  alias: string
  name: string
  url: string
}

export const Url = ({ link }: { link: Link }) => (
  <span className="link">
    <a href={link.url}>{link.name}</a>
  </span>
)

// The round badge carrying the icon derived from the address.
const Badge = ({ url }: { url?: string }) => {
  const SvgIcon = getIconForUrl(url)
  return (
    <span className="link-badge">
      <span className="link-badge-glyph">
        <SvgIcon />
      </span>
    </span>
  )
}

export const CircleUrl = ({ link }: { link: Link }) => (
  <span className="link">
    <a title={link.name} href={link.url}>
      <Badge url={link.url} />
    </a>
  </span>
)

export const FullUrl = ({ link }: { link: Link }) => (
  <span className="link">
    <a className="link-full" title={link.name} href={link.url}>
      <Badge url={link.url} />
      <span className="link-label">{link.name}</span>
    </a>
  </span>
)

export const LinkPreview = ({ link }: { link: Link }) => (
  <div className="link-preview">
    <div className="link-preview-box">
      <Badge url={link.url} />
      <div className="link-preview-text">
        <p className="link-preview-name">{link.name}</p>
        <p className="link-preview-alias">
          <i>{link.alias}</i>
        </p>
        <p className="link-preview-url">
          <a href={link.url}>{link.url}</a>
        </p>
      </div>
    </div>
  </div>
)
