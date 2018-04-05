/*
import * as React from "react";

import { merge } from "../utils";

const About = ({ meta, contactIconColor, textColor }: {
  meta: Meta,
  contactIconColor: string,
  textColor: string
}): React.ReactElement<any> => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        maxWidth: 250
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
          <span style={{ fontSize: 24, color: textColor }}>{meta.name}</span>
          <i style={{ color: textColor }}>{meta.birthday}</i>
          <div style={{ marginTop: 5 }}>
            {flags}
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
          <p
            key={spec}
            style={{
              paddingTop: 6,
              color: textColor
            }}
          >
            {spec}
          </p>
        )})}
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
          <ComIcon key={media} color={contactIconColor} link={media} />
        })}
      </div>

    </div>
  );

*/