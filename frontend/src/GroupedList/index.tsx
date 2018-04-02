import * as React from "react";

import { GroupedItems } from "./grouping";

export type RenderItem<T extends {}> = (item: T) => React.ReactElement<any>;

const Group = <T extends {}>(props: {
  group: GroupedItems<T>, 
  renderItem: RenderItem<T>
}): React.ReactElement<any> => (
  <div 
    style={{
      marginBottom: 15,
      pageBreakInside: "avoid"
    }}
  >
    <h2 style={{ pageBreakAfter: "avoid" }}>{props.group}</h2>
  </div>
);

const GroupedList = <T extends {}>(props: {
  items: GroupedItems<T>[],
  renderItem: RenderItem<T>
}): React.ReactElement<any> => (
  <div 
    style={{
      display: "flex"
    }}
  >
    {props.items.map(item => <Group 
      key={item.group} 
      group={item} 
      renderItem={props.renderItem} 
    />)}
  </div>
);

export const Desktop = <T extends {}>(props: {
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
          width: 300,
          height: 220
        }}
      >
        {props.renderItem(item)}
      </div>
    )}
  />
);

export default Desktop;
