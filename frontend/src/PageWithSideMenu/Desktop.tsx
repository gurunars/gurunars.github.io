import * as React from "react";
import * as _ from "lodash";

import { VisibilityProps } from "./props";

const maximize = require("./maximize.svg");
const minimize = require("./minimize.svg");

const BASE_STYLE = {
  position: "absolute",
  bottom: 0,
  left: 0
};

const PageWithSideMenu = (props: {
  menu: React.ReactElement<any>,
  content: React.ReactElement<any>,
  menuWidth?: number,
} & VisibilityProps): React.ReactElement<any> => {
  let menuWidth;
  let style;

  if (props.menuIsVisible) {
    menuWidth = props.menuWidth || 250;
    style = {
      width: menuWidth,
      height: "100%"
    };
  } else {
    style = {
      width: 30,
      height: 30,
    };
    menuWidth = 0;
  }

  return (
    <div
      style={{
        position: "relative", height: "100%", width: "100%"
      }}
    >
      <div style={_.merge({}, BASE_STYLE, style)}>
        {props.menuIsVisible ? props.menu : null}
        <img
          src={props.menuIsVisible ? minimize : maximize}
          onClick={() => props.menuIsVisibleOnChange(!props.menuIsVisible)}
          style={{
            cursor: "pointer",
            position: "absolute",
            bottom: 10,
            right: 10,
            marginLeft: 4,
            zIndex: 100
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "calc(100% - " + menuWidth + "px)"
        }}
      >
        {props.content}
      </div>
    </div>
  );
};

export default PageWithSideMenu;