import * as React from "react";

import { GroupedItems } from "./interfaces";
import responsive from "../Responsive";

type RenderItem<T extends {}> = (props: {item: T}) => React.ReactElement<any>;

const GroupedList = <T extends {}>(props: {
  items: GroupedItems<T>[],
  renderItem: RenderItem<T>,
  style?: React.CSSProperties
}): React.ReactElement<any> => (
  <div>
    {props.items.map(item => (
    <div 
      style={{
        marginBottom: 15,
        pageBreakInside: "avoid"
      }}
    >
      <h2 style={{ pageBreakAfter: "avoid" }}>{item.group}</h2>
      <div style={props.style}>
        {item.elements.map(element => props.renderItem({item: element}))}
      </div>
    </div>
    ))}
  </div>
);

export const Desktop = <T extends {}>(props: {
  items: GroupedItems<T>[],
  renderItem: RenderItem<T>
}): React.ReactElement<any> => (
  <GroupedList
    items={props.items}
    style={{display: "flex"}}
    renderItem={ item => (
      <div 
        style={{
          display: "inline-block",
          position: "relative",
          width: 300,
          height: 220
        }}
      >
        {props.renderItem(item)}
      </div>
    )}
  />
);

export const Mobile = <T extends {}>(props: {
  items: GroupedItems<T>[],
  renderItem: RenderItem<T>
}): React.ReactElement<any> => (
  <GroupedList
    items={props.items}
    renderItem={ item => (
      <div 
        style={{
          display: "inline-block",
          position: "relative",
          width: "100%",
          height: "auto"
        }}
      >
        {props.renderItem(item)}
      </div>
    )}
  />
);

export default responsive({
  desktopView: Desktop,
  mobileView: Mobile
});
