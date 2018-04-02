import * as React from "react";

import { merge } from "../utils";

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

export const CircleUrl = ({ link, style }: {
  link: Link, 
  style?: React.CSSProperties 
}) => (
  <a 
    title={link.name} 
    style={
      merge((style || {}), {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "2px solid black"
      })} 
    href={link.url}
  >
    +
  </a>
);