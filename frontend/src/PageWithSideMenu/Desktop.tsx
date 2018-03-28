import * as React from "react";

import { VisibilityProps } from "./props";

const IconMinMax = (props: VisibilityProps): React.ReactElement<any> => {

  let icon = props.menuIsVisible ? "minimize" : "maximize";

  return (
    <span
      onClick={() => props.menuIsVisibleOnChange(!props.menuIsVisible)}
      style={{
        cursor: "pointer",
        position: "absolute",
        bottom: 10,
        left: 10,
        marginLeft: 4,
        zIndex: 100
      }}
    >{icon}
    </span>
  );

};

const MaximizedMenu = (props: {
  menu: React.ReactElement<any>
} & VisibilityProps): React.ReactElement<any> => (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#1B2E3C",
        padding: 5,
        width: 250,
        height: "100%"
      }}
    >
      {props.menu}
      <IconMinMax {...props} />
    </div>
  );

const PageWithSideMenu = (props: {
  menu: React.ReactElement<any>,
  content: React.ReactElement<any>
} & VisibilityProps): React.ReactElement<any> => {

  let menuWidth;
  let menu;

  if (props.menuIsVisible) {
    menu = <MaximizedMenu menu={props.menu} {...props} />;
    menuWidth = 250;
  } else {
    menu = <IconMinMax {...props} />;
    menuWidth = 0;
  }

  return (
    <div
      style={{
        position: "relative", height: "100%", width: "100%"
      }}
    >
      {menu}
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