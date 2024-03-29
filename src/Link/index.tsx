import _ from 'lodash'
import React from 'react'

import { merge } from '../utils'

import getIconForType from './icons'

export const DirectLinkContext = React.createContext(true)

export interface Link {
  alias: string;
  name: string;
  url: string;
  type?: string;
}

const asUrl = (link: Link) =>
  window.location.href.replace(/#.*$/, '').replace(/\/$/, '') +
  '#/sh/' +
  link.alias

const DecoratedLink = (props: {
  link: Link;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <DirectLinkContext.Consumer>
    {(isDirect: boolean) => (
      <span
        style={merge(
          {
            display: 'inline-flex',
            alignItems: 'center',
          },
          props.style || {},
        )}
      >
        {props.children}
        {!isDirect && (
          <span
            style={{
              marginLeft: 5,
            }}
          >
            [ {asUrl(props.link)} ]
          </span>
        )}
      </span>
    )}
  </DirectLinkContext.Consumer>
)

export const Url = ({
  link,
  style,
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DecoratedLink style={style} link={link}>
    <a href={link.url}>{link.name}</a>
  </DecoratedLink>
)

const CircleType = ({ type, color }: { type?: string; color: string }) => {
  const SvgIcon = getIconForType(type)
  return (
    <span
      style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        width: 30,
        minWidth: 30,
        height: 30,
        minHeight: 30,
        borderRadius: '50%',
        border: '2px solid ' + color,
      }}
    >
      <div
        style={{
          width: '70%',
          height: '70%',
        }}
      >
        <SvgIcon style={{ fill: color }} />
      </div>
    </span>
  )
}

export const CircleUrl = ({
  link,
  style,
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DecoratedLink style={style} link={link}>
    <a title={link.name} href={link.url}>
      <CircleType color={_.get(style, 'color') || 'black'} type={link.type} />
    </a>
  </DecoratedLink>
)

export const FullUrl = ({
  link,
  style,
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DecoratedLink style={style} link={link}>
    <a
      title={link.name}
      style={{ alignItems: 'center', display: 'inline-flex' }}
      href={link.url}
    >
      <CircleType color={_.get(style, 'color') || 'black'} type={link.type} />
      <span
        style={{
          marginLeft: '5px',
        }}
      >
        {link.name}
      </span>
    </a>
  </DecoratedLink>
)

export interface MappingSpec {
  [key: string]: Link;
}

export const LinkPreview = ({
  link,
}: {
  link: Link
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyItems: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        border: '1px dotted black',
        padding: 10,
      }}
    >
      <CircleType color="black" type={link.type} />
      <div
        style={{
          marginLeft: 10,
        }}
      >
        <p
          style={{
            fontSize: 21,
          }}
        >
          {link.name}
        </p>
        <p
          style={{
            color: 'gray',
            fontSize: 12,
            marginTop: 6,
          }}
        >
          <i>{link.alias}</i>
        </p>
        <p
          style={{
            marginTop: 10,
          }}
        >
          <a href={link.url} style={{ wordBreak: 'break-all' }}>
            {link.url}
          </a>
        </p>
      </div>
    </div>
  </div>
)

