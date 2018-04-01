import * as React from "react";

import CursorIcon from "./CursorIcon";

import Link from "../Link";
import next from "./next";
import prev from "./prev";
import close from "./close";
import { Item, Cursor, getCursorItems } from "./Cursor";

const Carousel = <T extends Item>(props: {
  items: T[],
  selectedId: string,
  children: any
}): React.ReactElement<any> => {
  const cursor: Cursor<T> = getCursorItems(props.items, props.selectedId);

  const dims = 15;
  const controlsWidth = 50;

  const controlsStyle: React.CSSProperties = {
    float: "left",
    width: controlsWidth,
    height: "100%",
    overflow: "hidden",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  };

  const mainAreaStyle: React.CSSProperties = {
    float: "left",
    width: "calc(100% - " + controlsWidth * 2 + "px)",
    height: "100%",
    overflow: "auto"
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >

      <div style={controlsStyle}>
        <CursorIcon icon={prev} item={cursor.previous} />
      </div>

      <div style={mainAreaStyle}>
        {props.children(cursor.current)}
      </div>

      <div style={controlsStyle}>
        <CursorIcon icon={next} item={cursor.next} />
      </div>

      <Link
        params={{ id: null }}
        style={{
          position: "absolute",
          display: "flex",
          color: "black",
          top: 10,
          right: 10,
          width: dims * 2,
          height: dims * 2
        }}
      >{close}
      </Link>

    </div>
  );
};

export default Carousel;