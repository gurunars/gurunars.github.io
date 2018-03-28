import * as React from "react";

import responsive from "../Responsive";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

const PageWithSideMenu = (props: {
  menuTitle: string,
  contentTitle: string,
  menu: React.ReactElement<any>,
  content: React.ReactElement<any>
}): React.ReactElement<any> => (
    <div> 
      {
        responsive({
          desktopView: Desktop,
          mobileView: Mobile
        })
      }
    </div>
  );

export default PageWithSideMenu;
