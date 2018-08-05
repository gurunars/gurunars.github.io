import * as React from "react";

import Box from "../Box";
import { FullSize } from "../Layouts";
import responsive from "../Responsive";

import ActionIcon from "../ActionIcon";
import close from "./icons/close.svg";
import menu from "./icons/menu.svg";

interface Props {
  menuTitle: string;
  contentTitle: string;
  menu: React.ReactElement<any>;
  children: React.ReactElement<any>;
}

export interface MenuVisibility {
  menuIsVisible: Box<boolean>;
}

const Desktop = (props: Props): React.ReactElement<any> => (
  <FullSize style={{ flexDirection: "row" }}>
    <div
      style={{
        position: "relative",
        height: "100%"
      }}
    >
      {props.menu}
    </div>
    <div
      style={{
        position: "relative",
        height: "100%",
        flex: "1 1 auto"
      }}
    >
      {props.children}
    </div>
  </FullSize>
);

const Mobile = (props: Props & MenuVisibility): React.ReactElement<any> => (
  <FullSize style={{ overflow: "hidden" }}>
    <FullSize style={{ overflowY: "auto", display: "initial" }}>
      {props.menuIsVisible.get() ? props.menu : props.children}
    </FullSize>

    <ActionIcon
      onClick={() => props.menuIsVisible.set(!props.menuIsVisible.get())}
      icon={props.menuIsVisible.get() ? close : menu}
    />
  </FullSize>

);

const PageWithSideMenu = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default PageWithSideMenu;
