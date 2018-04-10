import * as React from "react";

import { Item, durationToString } from "./interface";
import { merge } from "../utils";
import { Url, CircleUrl } from "../Link";
import { FullSize } from "../Layouts";

const baseStyle = {
  display: "block",
  position: "relative",
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  width: 300
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

const ItemView = ({ item, onClick, style }: {
  item: Item,
  onClick: () => void,
  style?: React.CSSProperties
}): React.ReactElement<any> => (
    <FullSize
      style={
        merge(
          {
            flexDirection: "column",
            marginBottom: 10
          },
          style || {}
        )
      }
    >
      <div style={flexMax}>
        <div style={flexMax}>
          <span
            style={merge(baseStyle, {
              paddingBottom: 0,
              fontWeight: "bold",
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer"
            })}
            onClick={onClick}
          >{item.title}
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
            {durationToString(item.duration)}
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
          <CircleUrl
            style={{ marginRight: 5 }}
            key={link.name}
            link={link}
          />
        ))}
      </div>
    </FullSize>
  );

export default ItemView;