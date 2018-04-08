import * as React from "react";
import * as _ from "lodash";
import ReactSVG from "react-svg";

import { merge } from "../utils";

import getIconForType from "./icons";

export interface Link {
  name: string;
  url: string;
  type?: string;
}

export const Url = ({ link, style }: {
  link: Link,
  style?: React.CSSProperties
}) =>
  <a style={style} href={link.url}>{link.name}</a>;

const CircleType = ({ type, color }: { type?: string, color: string }) => (
  <a
    style={{
      display: "flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      width: 30,
      height: 30,
      borderRadius: "50%",
      border: "2px solid " + color
    }}
  >
    <div
      style={{
        width: "70%",
        height: "70%"
      }}
    >
      <ReactSVG path={getIconForType(type)} style={{ fill: color }} />
    </div>
  </a>
);

export const CircleUrl = ({ link, style }: {
  link: Link,
  style?: React.CSSProperties
}) => (
    <a
      title={link.name}
      style={style}
      href={link.url}
    >
      <CircleType color={_.get(style, "color", "black")} type={link.type} />
    </a>
  );

export const FullUrl = ({ link, style }: {
  link: Link,
  style?: React.CSSProperties
}) => (
    <a
      title={link.name}
      style={merge({ alignItems: "center", display: "inline-flex" }, style || {})}
      href={link.url}
    >
      <CircleType color={_.get(style, "color", "black")} type={link.type} />
      <span
        style={{
          marginLeft: "5px"
        }}
      >
        {link.name}
      </span>
    </a>
  );