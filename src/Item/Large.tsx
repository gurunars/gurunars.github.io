import type React from 'react'

import { FullUrl, Url } from '../Link'
import { durationToRangeString, type Item } from './interface'
import Tag from './Tag'

import './large.css'

const Section = (props: { title: string; children: React.ReactNode }) => (
  <div>
    <h4 className="item-section-title">{props.title}</h4>
    <div>{props.children}</div>
  </div>
)

const ItemView = ({ item }: { item: Item }): React.ReactElement<any> => (
  <div className="item">
    <div className="item-header">
      {item.logo && <img className="item-logo" alt="logo" src={item.logo} />}
      <div>
        <h3 className="item-title">{item.title}</h3>
        {item.location && (
          <p className="item-origin">
            <b>[at]:</b>
            <Url link={item.location} />
          </p>
        )}
        <p className="item-meta">
          {item.type} | {durationToRangeString(item.duration)}{' '}
        </p>
      </div>
    </div>

    <div className="item-body">
      {item.description && item.description.length > 0 && <Section title="Description">{item.description}</Section>}
      {item.achievements && item.achievements.length > 0 && (
        <Section title="Achievements">
          <ul className="item-list">
            {item.achievements.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </Section>
      )}
      {item.references && item.references.length > 0 && (
        <Section title="References">
          <ul className="item-list">
            {item.references.map((reference) => (
              <li key={reference.url}>
                <Url link={reference} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <div className="item-tags">
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>

    <div className="item-links">
      {item.links.map((link) => (
        <FullUrl key={link.url} link={link} />
      ))}
    </div>
  </div>
)

export default ItemView
