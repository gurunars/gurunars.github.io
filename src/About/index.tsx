import * as React from "react";
import * as _ from "lodash";

import { FullUrl, Link } from "../Link";
import { toString, merge } from "../utils";
import responsive from "../Responsive";

export interface Meta {
  name: string;
  languages: string[];
  birthday: Date;
  specialization: string[];
  avatar: string;
  media: Link[];
}

const About = ({ meta, primaryColor, secondaryColor, style }: {
  meta: Meta,
  primaryColor: string,
  secondaryColor: string,
  style?: React.CSSProperties
}): React.ReactElement<any> => (
    <div
      style={
        merge(
          {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            minWidth: 300,
            color: primaryColor || "black"
          },
          style || {}
        )}
    >
      <div
        style={{
          width: "100%",
          height: 80,
          alignItems: "center",
          padding: 10,
          display: "flex"
        }}
      >
        <img
          src={meta.avatar}
          style={{
            width: 65,
            height: 65,
            marginRight: 10,
            borderRadius: "50%",
            border: "5px solid black"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <span style={{ fontSize: 24 }}>{meta.name}</span>
          <i>{toString(meta.birthday)}</i>
          <div style={{ marginTop: 5 }}>
            {_.join(meta.languages, " | ")}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "block",
          width: "100%",
          marginTop: 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 5,
          paddingRight: 5,
          borderTop: "1px solid grey",
        }}
      >
        {meta.specialization.map(spec => (
          <p key={spec} style={{ paddingTop: 6 }}>
            {spec}
          </p>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          borderTop: "1px solid grey",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "100%",
          padding: 10
        }}
      >
        {meta.media.map(media =>
          <FullUrl
            style={{
              color: secondaryColor || "black",
              textDecoration: "none",
              paddingBottom: 5
            }}
            key={media.url}
            link={media}
          />
        )}
      </div>

    </div>
  );

export default responsive({
  mobileView: ({ meta }: { meta: Meta }) => (
    <About
      meta={meta}
      secondaryColor="black"
      primaryColor="black"
    />
  ),
  desktopView: ({ meta }: { meta: Meta }) => (
    <About
      meta={meta}
      secondaryColor="PaleTurquoise"
      primaryColor="white"
      style={{
        backgroundColor: "#1B2E3C",
        padding: 5
      }}
    />
  )
});