import * as React from "react";
import ReactSVG from "react-svg";

import { FullSize } from "../Layouts";

import CursorIcon from "./CursorIcon";

import { Cursor, getCursorItems } from "./Cursor";
import Props from "./Props";

const close = require("./icons/close.svg");
const prev = require("./icons/prev.svg");
const next = require("./icons/next.svg");

const Carousel = (props: Props): React.ReactElement<any> => {
  const cursor: Cursor = getCursorItems(props.size, props.selectedPostion);

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
    <FullSize>

      <div style={controlsStyle}>
        <CursorIcon icon={<ReactSVG path={prev} />} targetPosition={cursor.previous} goTo={props.goTo} />
      </div>

      <div style={mainAreaStyle}>
        {props.children(cursor.current || 0)}
      </div>

      <div style={controlsStyle}>
        <CursorIcon icon={<ReactSVG path={next} />} targetPosition={cursor.next} goTo={props.goTo} />
      </div>

      <div
        onClick={props.close}
        style={{
          position: "absolute",
          display: "flex",
          color: "black",
          cursor: "pointer",
          top: 10,
          right: 10,
          width: dims * 2,
          height: dims * 2
        }}
      ><ReactSVG path={close} />
      </div>

    </FullSize>
  );
};

export default Carousel;