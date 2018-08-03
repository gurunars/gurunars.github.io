import * as _ from "lodash";
import * as React from "react";

import { CircleUrl, Link } from "../Link";
import responsive from "../Responsive";
import { merge, toString } from "../utils";

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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        {meta.media.map(media =>
          <CircleUrl
            style={{
              color: secondaryColor || "black",
              textDecoration: "none",
              margin: 5
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