import * as React from "react";

import { merge } from "../utils";
import responsive from "../Responsive";

interface Props {
  menuTitle: string;
  contentTitle: string;
  menu: React.ReactElement<any>;
  content: React.ReactElement<any>;
}

interface MenuVisibility {
  menuIsVisible: boolean;
  menuIsVisibleOnChange: (state: boolean) => void;
}

const MENU_WIDTH = 250;

const Desktop = (props: Props): React.ReactElement<any> => (
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
        width: MENU_WIDTH,
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
        width: "calc(100% - " + MENU_WIDTH + "px)"
      }}
    >
      {props.content}
    </div>
  </div>
);

const tabStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderLeft: "1px solid black",
  borderRight: "1px solid black",
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  backgroundColor: "white",
  marginBottom: -1,
  width: "50%",
  marginTop: 5,
  marginLeft: 5,
  marginRight: 5,
  textDecoration: "none",
  color: "black",
  cursor: "pointer",
  fontWeight: "bold"
};

const activeTabStyle = {
  borderBottom: "1px solid white",
  backgroundColor: "white"
};

const Tab = (props: {
  children: string,
  isSelected: boolean,
  onClick: () => void
}): React.ReactElement<any> => (
    <div
      style={props.isSelected ? merge(tabStyle, activeTabStyle) : tabStyle}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );

const Mobile = (props: Props & MenuVisibility): React.ReactElement<any> => (
  <div
    style={{
      overflowY: "hidden",
      position: "relative",
      height: "100%",
      width: "100%"
    }}
  >
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: 35,
        borderBottom: "1px solid black"
      }}
    >

      <Tab
        isSelected={props.menuIsVisible}
        onClick={() => props.menuIsVisibleOnChange(true)}
      >
        {props.menuTitle}
      </Tab>

      <Tab
        isSelected={!props.menuIsVisible}
        onClick={() => props.menuIsVisibleOnChange(false)}
      >
        {props.contentTitle}
      </Tab>

    </div>

    <div
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "calc(100% - 35px)",
        width: "100%"
      }}
    >
      {props.menuIsVisible ? props.menu : props.content}
    </div>
  </div>
);

const PageWithSideMenu = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default PageWithSideMenu;
