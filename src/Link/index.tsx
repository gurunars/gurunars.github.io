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

const asUrl = (link: Link) =>
  "http://" + window.location.hostname + "#/sh/" + link.alias;

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
            display: "inline-flex",
            alignItems: "center"
          },
          props.style || {}
        )}
      >
        {props.children}
        {!isDirect && (
          <span
            style={{
              marginLeft: 5
            }}
          >
            [ {asUrl(props.link)} ]
          </span>
        )}
      </span>
    )}
  </DirectLinkContext.Consumer>
);

export const Url = ({
  link,
  style
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DecoratedLink style={style} link={link}>
    <DirectLinkContext.Consumer>
      {(isDirect: boolean) => (
        <a href={isDirect ? link.url : asUrl(link)}>{link.name}</a>
      )}
    </DirectLinkContext.Consumer>
  </DecoratedLink>
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
  <DecoratedLink style={style} link={link}>
    <DirectLinkContext.Consumer>
      {(isDirect: boolean) => (
        <a title={link.name} href={isDirect ? link.url : asUrl(link)}>
          <CircleType
            color={_.get(style, "color") || "black"}
            type={link.type}
          />
        </a>
      )}
    </DirectLinkContext.Consumer>
  </DecoratedLink>
);

export const FullUrl = ({
  link,
  style
}: {
  link: Link;
  style?: React.CSSProperties;
}) => (
  <DecoratedLink style={style} link={link}>
    <DirectLinkContext.Consumer>
      {(isDirect: boolean) => (
        <a
          title={link.name}
          style={{ alignItems: "center", display: "inline-flex" }}
          href={isDirect ? link.url : asUrl(link)}
        >
          <CircleType
            color={_.get(style, "color") || "black"}
            type={link.type}
          />
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
  </DecoratedLink>
);

export interface MappingSpec {
  [key: string]: Link;
}

export const LinkPreview = ({
  links,
  alias
}: {
  links: MappingSpec;
  alias: string;
}) => {
  const link = links[alias];
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          border: "1px dotted black",
          padding: 10
        }}
      >
        <CircleType color="black" type={link.type} />
        <div
          style={{
            marginLeft: 10
          }}
        >
          <p
            style={{
              fontSize: 21
            }}
          >
            {link.name}
          </p>
          <p
            style={{
              color: "gray",
              fontSize: 12,
              marginTop: 6
            }}
          >
            <i>{link.alias}</i>
          </p>
          <p
            style={{
              marginTop: 10
            }}
          >
            <a href={link.url}>{link.url}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
