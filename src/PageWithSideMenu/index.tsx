import React from "react";
import posed from "react-pose";

import Box from "../Box";
import { FullSize } from "../Layouts";
import responsive from "../Responsive";

import ActionIcon from "../ActionIcon";

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

const Rotatable = posed.div({
  open: {
    rotate: 360 + 45,
    transition: {
      duration: 400
    }
  },
  closed: {
    rotate: 0,
    transition: {
      duration: 400
    }
  }
});

const Mobile = (props: Props & MenuVisibility): JSX.Element => (
  <FullSize style={{ overflow: "hidden" }}>
    <FullSize style={{ overflowY: "auto", display: "initial" }}>
      {props.menuIsVisible.get() ? props.menu : props.children}
    </FullSize>

    <Rotatable
      style={{
        position: "absolute",
        bottom: 20,
        right: 20
      }}
      onClick={() => props.menuIsVisible.set(!props.menuIsVisible.get())}
      pose={props.menuIsVisible.get() ? "open" : "closed"}
    >
      <ActionIcon onClick={() => {}} icon={<Menu />} />
    </Rotatable>
  </FullSize>
);

const PageWithSideMenu = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default PageWithSideMenu;
