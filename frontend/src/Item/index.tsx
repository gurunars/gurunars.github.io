import * as React from "react";

import { Item, durationToString } from "./interface";
import { merge } from "../utils";
import { Url } from "../Link";

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
  position: "absolute",
  bottom: 0,
  padding: 5,
  fontStyle: "italic",
  fontSize: "0.8em"
};

const ItemView = ({ item, openItem }: {
  item: Item,
  openItem: (item: Item) => void
}): React.ReactElement<any> => (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          flex: "1 1 auto"
        }}
      >
        <span
          style={merge(baseStyle, { paddingBottom: 0, fontWeight: "bold" })}
          onClick={() => openItem(item)}
        >{item.title}
        </span>
        <span style={merge(baseStyle, { fontSize: "0.8em", marginTop: 10 })}>
          {item.description}
        </span>
        <Url 
          link={item.location}
          style={merge(metaInfoStyle, { bottom: 0, width: 160 })}
        />
        <span style={merge(metaInfoStyle, { right: 0 })}>
          {durationToString(item.duration)}
        </span>
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
        {item.links.map(link => <Url key={link.name} link={link} />)}
      </div>
    </div>
  );

export default ItemView;