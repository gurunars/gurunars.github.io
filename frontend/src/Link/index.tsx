import * as React from "react";
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

const CircleType = ({ type }: { type?: string }) => (
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
      border: "2px solid black"
    }}
  >
    <div
      style={{
        width: "70%",
        height: "70%"
      }}
    >
      <ReactSVG path={getIconForType(type)} />
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
      <CircleType type={link.type} />
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
      <CircleType type={link.type} />
      <span
        style={{
          marginLeft: "5px"
        }}
      >
        {link.name}
      </span>
    </a>
  );