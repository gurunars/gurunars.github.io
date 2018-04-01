import * as React from "react";

import CursorIcon from "./CursorIcon";

import Link from "../Link";
import next from "./icons/next";
import prev from "./icons/prev";
import close from "./icons/close";
import { Item, Cursor, getCursorItems } from "./Cursor";

const Carousel = <T extends Item>(props: {
  items: T[],
  selectedId: string,
  children: any
}): React.ReactElement<any> => {
  const cursor: Cursor<T> = getCursorItems(props.items, props.selectedId);

  const dims = 15;
  const controlsSize = 50;

  const controlsStyle: React.CSSProperties = {
    width: controlsSize,
    height: controlsSize,
    padding: 10
  };

  const mainAreaStyle: React.CSSProperties = {
    width: "100%",
    height: "calc(100% - " + controlsSize + "px",
    overflow: "auto"
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >

      <div style={mainAreaStyle}>
        {props.children(cursor.current)}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "flex",
          width: "100%",
          backgroundColor: "white",
          height: controlsSize,
          justifyContent: "space-between",
          borderTop: "1px solid gray"
        }}
      >

        <div style={controlsStyle}>
          <CursorIcon icon={prev} item={cursor.previous} />
        </div>

        <div style={controlsStyle}>
          <Link
            params={{ id: null }}
            style={{
              color: "black",
              width: dims * 2,
              height: dims * 2,
            }}
          >{close}
          </Link>
        </div>

        <div style={controlsStyle}>
          <CursorIcon icon={next} item={cursor.next} />
        </div>

      </div>

    </div>
  );
};

export default Carousel;