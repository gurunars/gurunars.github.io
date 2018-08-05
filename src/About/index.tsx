import * as _ from "lodash";
import * as React from "react";

import { CircleUrl, Link } from "../Link";
import { toString } from "../utils";

export interface Meta {
  name: string;
  languages: string[];
  birthday: Date;
  specialization: string[];
  avatar: string;
  media: Link[];
}

const About = ({ meta }: {
  meta: Meta
}): React.ReactElement<any> => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        minWidth: "100%",
        color: "black"
      }}
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
              color: "black",
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

export default About;
