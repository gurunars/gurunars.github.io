import React from "react";

import Box from "../Box";
import { FullSize } from "../Layouts";
import responsive from "../Responsive";

import ActionIcon from "../ActionIcon";

import { ReactComponent as Close } from "./icons/close.svg";
import { ReactComponent as Menu } from "./icons/menu.svg";

interface Props {
  menuTitle: string;
  contentTitle: string;
  menu: JSX.Element;
  children: JSX.Element;
}

export interface MenuVisibility {
  menuIsVisible: Box<boolean>;
}

const Desktop = (props: Props): JSX.Element => (
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

const Mobile = (props: Props & MenuVisibility): JSX.Element => (
  <FullSize style={{ overflow: "hidden" }}>
    <FullSize style={{ overflowY: "auto", display: "initial" }}>
      {props.menuIsVisible.get() ? props.menu : props.children}
    </FullSize>

    <ActionIcon
      onClick={() => props.menuIsVisible.set(!props.menuIsVisible.get())}
      icon={props.menuIsVisible.get() ? <Close /> : <Menu />}
    />
  </FullSize>
);

const PageWithSideMenu = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default PageWithSideMenu;
