import * as React from "react";

import { FullSize } from "../Layouts";
import { CircleUrl, Url } from "../Link";
import { merge } from "../utils";
import { durationToRangeString, Item } from "./interface";

const baseStyle = {
  display: "block",
  position: "relative",
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5
};

const metaInfoStyle = {
  bottom: 0,
  padding: 5,
  fontStyle: "italic",
  fontSize: "0.8em"
};

const flexMax: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
  flex: "1 1 auto"
};

// TODO: show number of achievements in the small box

const ItemView = ({
  item,
  onClick,
  style
}: {
  item: Item;
  onClick: () => void;
  style?: React.CSSProperties;
}): React.ReactElement<any> => (
  <FullSize
    style={merge(
      {
        flexDirection: "column",
        marginBottom: 10
      },
      style || {}
    )}
  >
    <div style={flexMax}>
      <div style={flexMax}>
        <span
          style={merge(baseStyle, {
            paddingBottom: 0,
            display: "flex",
            fontWeight: "bold",
            alignItems: "center",
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer"
          })}
          onClick={onClick}
        >
          {item.logo && (
            <img
              src={item.logo}
              style={{
                width: 45,
                height: 45,
                marginRight: 10,
                borderRadius: "50%",
                border: "2px solid black"
              }}
            />
          )}
          {item.title}
        </span>
        <span style={merge(baseStyle, { fontSize: "0.8em", marginTop: 10 })}>
          {item.description}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Url
          link={item.location}
          style={merge(metaInfoStyle, { bottom: 0, width: 160 })}
        />
        <span style={merge(metaInfoStyle, { right: 0 })}>
          {durationToRangeString(item.duration)}
        </span>
      </div>
    </div>
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        height: 40,
        flex: "0 1 40px",
        width: "100%",
        bottom: 0,
        left: 0,
        padding: 5,
        marginTop: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start"
      }}
    >
      {item.links.map(link => (
        <CircleUrl style={{ marginRight: 5 }} key={link.name} link={link} />
      ))}
    </div>
  </FullSize>
);

export default ItemView;
