import * as React from "react";

import CursorIcon from "./CursorIcon";

import next from "./icons/next";
import prev from "./icons/prev";
import close from "./icons/close";
import { Cursor, getCursorItems } from "./Cursor";
import Props from "./Props";

const Carousel = <T extends {}>(props: Props<T>): React.ReactElement<any> => {
  const cursor: Cursor = getCursorItems(props.items, props.selectedPostion);

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
          <CursorIcon icon={prev} targetPosition={cursor.previous} goTo={props.goTo} />
        </div>

        <div style={controlsStyle}>
          <div
            onClick={props.close}
            style={{
              color: "black",
              width: dims * 2,
              height: dims * 2,
            }}
          >{close}
          </div>
        </div>

        <div style={controlsStyle}>
          <CursorIcon icon={next} targetPosition={cursor.next} goTo={props.goTo} />
        </div>

      </div>

    </div>
  );
};

export default Carousel;