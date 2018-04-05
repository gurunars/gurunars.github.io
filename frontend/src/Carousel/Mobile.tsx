import * as React from "react";

import FontAwesomeIcon from "../FontAwesome";
import * as faClose from "@fortawesome/fontawesome-free-regular/faTimesCircle";
import * as faRight from "@fortawesome/fontawesome-free-regular/faArrowAltCircleRight";
import * as faLeft from "@fortawesome/fontawesome-free-regular/faArrowAltCircleLeft";

import CursorIcon from "./CursorIcon";

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
        {props.children(props.items[cursor.current || 0])}
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
          <CursorIcon
            icon={<FontAwesomeIcon size="2x" icon={faLeft} />}
            targetPosition={cursor.previous}
            goTo={props.goTo}
          />
        </div>

        <div style={controlsStyle}>
          <div
            onClick={props.close}
            style={{
              curosor: "pointer",
              color: "black",
              width: dims * 2,
              height: dims * 2,
            }}
          >
            <FontAwesomeIcon size="2x" icon={faClose} />
          </div>
        </div>

        <div style={controlsStyle}>
          <CursorIcon
            icon={<FontAwesomeIcon size="2x" icon={faRight} />}
            targetPosition={cursor.next}
            goTo={props.goTo}
          />
        </div>

      </div>

    </div>
  );
};

export default Carousel;