import * as React from "react";

import responsive from "../Responsive";
import { GroupedItems } from "./interfaces";

type RenderItem<T extends {}> = (props: { item: T }) => React.ReactElement<any>;

const GroupedList = <T extends {}>(props: {
  items: Array<GroupedItems<T>>,
  renderItem: RenderItem<T>,
  style?: React.CSSProperties
}): React.ReactElement<any> => (
    <div style={props.style}>
      {props.items.map(item => (
        <div
          key={item.group}
          style={{
            marginBottom: 15,
            pageBreakInside: "avoid",
            overflowY: "auto"
          }}
        >
          <h2 style={{
            pageBreakAfter: "avoid",
            marginBottom: 10
          }}>{item.group}</h2>
          <div>
            {
              item.elements
                .map(element => props.renderItem({ item: element }))
                .map((child, index) => React.cloneElement(
                  child,
                  { ...child.props, key: index }
                ))
            }
          </div>
        </div>
      ))}
    </div>
  );

interface Props<T extends {}> {
  items: Array<GroupedItems<T>>;
  renderItem: RenderItem<T>;
}

const Desktop = <T extends {}>(
  props: Props<T>
): React.ReactElement<any> => (
    <GroupedList
      items={props.items}
      style={{
        padding: 10
      }}
      renderItem={item => (
        <div
          style={{
            float: "left",
            display: "flex",
            position: "relative",
            width: 340,
            height: 250,
            marginRight: 10,
            marginBottom: 10
          }}
        >
          {props.renderItem(item)}
        </div>
      )}
    />
  );

const Mobile = <T extends {}>(
  props: Props<T>
): React.ReactElement<any> => (
    <GroupedList
      items={props.items}
      renderItem={item => (
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

const Grouping: <T extends {}>(props: Props<T>) => React.ReactElement<any> = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default Grouping;
