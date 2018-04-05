import * as React from "react";
import * as _ from "lodash";

import { FullUrl, Link } from "../Link";

export interface Meta {
  name: string;
  languages: string[];
  birthday: string;
  specialization: string[];
  avatar: string;
  media: Link[];
}

const About = ({ meta, color }: { meta: Meta, color?: string }): React.ReactElement<any> => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      maxWidth: 250,
      color: color || "black"
    }}
  >
    <div
      style={{
        width: 250,
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
        <i>{meta.birthday}</i>
        <div style={{ marginTop: 5 }}>
          {_.join(meta.languages, " | ")}
        </div>
      </div>
    </div>

    <div
      style={{
        display: "block",
        width: 250,
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
        width: 250,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 10
      }}
    >
      {meta.media.map(media =>
        <FullUrl style={{ color: color || "black" }} key={media.name} link={media} />
      )}
    </div>

  </div>
);

export default About;