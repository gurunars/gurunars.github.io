import * as React from "react";

import FontAwesomeIcon from "../FontAwesome";
import * as faTimesCircle from "@fortawesome/fontawesome-free-regular/faTimesCircle";
import * as faRight from "@fortawesome/fontawesome-free-regular/faArrowAltCircleRight";
import * as faLeft from "@fortawesome/fontawesome-free-regular/faArrowAltCircleLeft";

import CursorIcon from "./CursorIcon";

import { Cursor, getCursorItems } from "./Cursor";
import Props from "./Props";

const Carousel = <T extends {}>(props: Props<T>): React.ReactElement<any> => {
  const cursor: Cursor = getCursorItems(props.items, props.selectedPostion);

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
        <CursorIcon
          icon={<FontAwesomeIcon size="2x" icon={faLeft} />}
          targetPosition={cursor.previous}
          goTo={props.goTo}
        />
      </div>

      <div style={mainAreaStyle}>
        {props.children(props.items[cursor.current || 0])}
      </div>

      <div style={controlsStyle}>
        <CursorIcon
          icon={<FontAwesomeIcon size="2x" icon={faRight} />}
          targetPosition={cursor.next}
          goTo={props.goTo}
        />
      </div>

      <div
        onClick={props.close}
        style={{
          position: "absolute",
          color: "black",
          cursor: "pointer",
          top: 10,
          right: 10,
        }}
      >
        <FontAwesomeIcon size="2x" icon={faTimesCircle} />
      </div>

    </div>
  );
};

export default Carousel;