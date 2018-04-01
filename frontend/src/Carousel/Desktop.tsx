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
        <CursorIcon icon={prev} targetPosition={cursor.previous} goTo={props.goTo} />
      </div>

      <div style={mainAreaStyle}>
        {props.children(cursor.current)}
      </div>

      <div style={controlsStyle}>
        <CursorIcon icon={next} targetPosition={cursor.next} goTo={props.goTo} />
      </div>

      <div
        onClick={props.close}
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
      </div>

    </div>
  );
};

export default Carousel;