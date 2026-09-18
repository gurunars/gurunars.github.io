import type React from 'react'

import { FullUrl, Url } from '../Link'
import { durationToRangeString, type Item } from './interface'
import Tag from './Tag'

const Section = (props: { title: string; data: any }) => (
  <div>
    <h4
      style={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      {props.title}
    </h4>
    <div>{props.data}</div>
  </div>
)

const ItemView = ({ item }: { item: Item }): React.ReactElement<any> => (
  <div
    style={{
      padding: 10,
      position: 'relative',
      pageBreakInside: 'avoid',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {item.logo && (
        <img
          alt="logo"
          src={item.logo}
          style={{
            width: 95,
            height: 95,
            marginRight: 10,
            borderRadius: '50%',
            border: '2px solid var(--border)',
          }}
        />
      )}
      <div>
        <h3 style={{ marginBottom: 5 }}>{item.title}</h3>
        {item.location && (
          <p style={{ fontSize: 14 }}>
            <b style={{ color: 'var(--muted)' }}>[at]:</b>
            <Url link={item.location} />
          </p>
        )}
        <p style={{ fontSize: 13 }}>
          <i>
            {item.type} | {durationToRangeString(item.duration)}{' '}
          </i>
        </p>
      </div>
    </div>

    <div
      style={{
        marginLeft: 5,
        marginTop: 8,
        paddingLeft: 10,
        borderLeft: '3px solid var(--border)',
        paddingBottom: 10,
      }}
    >
      {item.description && item.description.length > 0 && <Section title="Description" data={item.description} />}
      {item.achievements && item.achievements.length > 0 && (
        <Section
          title="Achievements"
          data={
            <ul style={{ paddingLeft: 20 }}>
              {item.achievements.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          }
        />
      )}
      {item.references && item.references.length > 0 && (
        <Section
          title="References"
          data={
            <ul style={{ paddingLeft: 20 }}>
              {item.references.map((reference) => (
                <li key={reference.url}>
                  <Url link={reference} />
                </li>
              ))}
            </ul>
          }
        />
      )}
      <div style={{ marginTop: 10 }}>
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
      }}
    >
      {item.links.map((link) => (
        <FullUrl key={link.url} link={link} style={{ marginBottom: 4 }} />
      ))}
    </div>
  </div>
)

export default ItemView
