import React from 'react'

import { merge } from '../utils'

const Tag = (props: {
  children: React.ReactChild;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => (
  <i
    onClick={props.onClick}
    style={merge(
      {
        backgroundColor: 'Beige',
        display: 'inline-block',
        textDecoration: 'none',
        whiteSpace: 'pre',
        color: 'Black',
        marginRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        borderRadius: 5,
      },
      props.style || {},
    )}
  >
    {props.children}
  </i>
)

export default Tag
