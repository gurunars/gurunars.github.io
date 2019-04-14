import * as _ from "lodash";
import * as React from "react";
import ReactSVG from "react-svg";

import { merge } from "../utils";

import getIconForType from "./icons";

export const DirectLinkContext = React.createContext(true);

export interface Link {
  alias: string;
  name: string;
  url: string;
  type?: string;
}

export const Url = ({
  link,
  style
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DirectLinkContext.Consumer>
    {(isDirect: boolean) => (
      <a style={style} href={isDirect ? link.url : "#/sh/" + link.alias}>
        {link.name}
      </a>
    )}
  </DirectLinkContext.Consumer>
);

/* tslint:disable */
const CircleType = ({ type, color }: { type?: string; color: string }) => (
  <span
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
  </span>
);

export const CircleUrl = ({
  link,
  style
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DirectLinkContext.Consumer>
    {(isDirect: boolean) => (
      <a
        title={link.name}
        style={style}
        href={isDirect ? link.url : "#/sh/" + link.alias}
      >
        <CircleType color={_.get(style, "color") || "black"} type={link.type} />
      </a>
    )}
  </DirectLinkContext.Consumer>
);

export const FullUrl = ({
  link,
  style
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DirectLinkContext.Consumer>
    {(isDirect: boolean) => (
      <a
        title={link.name}
        style={merge(
          { alignItems: "center", display: "inline-flex" },
          style || {}
        )}
        href={isDirect ? link.url : "#/sh/" + link.alias}
      >
        <CircleType color={_.get(style, "color") || "black"} type={link.type} />
        <span
          style={{
            marginLeft: "5px"
          }}
        >
          {link.name}
        </span>
      </a>
    )}
  </DirectLinkContext.Consumer>
);

export const LinkPreview = ({ link }: { link: Link }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
      }}
    >
      <div>
        <CircleType color="black" type={link.type} />
        <p>{link.name}</p>
        <p>{link.alias}</p>
        <p>
          <a href={link.url}>{link.url}</a>
        </p>
      </div>
    </div>
  );
};
