import * as React from "react";
import * as _ from "lodash";

import { CoreProps } from "./props";

const PageWithSideMenu = (props: {
  menuWidth?: number,
  maximizeIcon?: React.ReactElement<any>,
  minimizeIcon?: React.ReactElement<any>
} & CoreProps): React.ReactElement<any> => {
  let menuWidth;
  let style;
  let icon;
  let iconStyle;

  if (props.menuIsVisible) {
    menuWidth = props.menuWidth || 250;
    style = {
      width: menuWidth,
      height: "100%"
    };
    icon = props.minimizeIcon || <pre>[-]</pre>;
    iconStyle = { right: 10 };
  } else {
    style = {
      width: 0,
      height: 0,
    };
    menuWidth = 0;
    icon = props.maximizeIcon || <pre>[+]</pre>;
    iconStyle = { left: 10 };
  }

  return (
    <div
      style={{
        position: "relative", 
        height: "100%", 
        width: "100%"
      }}
    >
      <div 
        style={_.merge(
          {}, {
            position: "absolute",
            bottom: 0,
            left: 0
          }, 
          style
        )}
      >
        {props.menuIsVisible ? props.menu : null}
        <div
          onClick={() => props.menuIsVisibleOnChange(!props.menuIsVisible)}
          style={_.merge(
            {}, {
              cursor: "pointer",
              position: "absolute",
              bottom: 10,
              zIndex: 100
            }, 
            iconStyle
          )}
        >
        {icon}
        </div>
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