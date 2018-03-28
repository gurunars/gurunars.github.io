import * as React from "react";

import { CoreProps } from "./props";

const PageWithSideMenu = (props: CoreProps): React.ReactElement<any> => {
  const menuWidth = props.menuWidth || 250;

  return (
    <div
      style={{
        position: "relative", 
        height: "100%", 
        width: "100%"
      }}
    >
      <div 
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: menuWidth,
          height: "100%"
        }}
      >
        {props.menu}
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