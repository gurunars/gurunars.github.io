import * as React from "react";

import { withState, compose, withProps } from "recompose";

import responsive from "../Responsive";
import ActionIcon from "../ActionIcon";

const close = require("./icons/close.svg");
const menu = require("./icons/menu.svg");

type Props = {
  toolbar: React.ReactElement<any>,
  children: React.ReactElement<any>
};

const Desktop = (props: Props): React.ReactElement<any> => (
  <div
    style={{
      display: "flex",
      position: "relative",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    }}
  >
    <div
      style={{
        height: 40,
        flex: "0 1 40px",
        width: "100%"
      }}
    >
      {props.toolbar}
    </div>
    <div
      style={{
        position: "relative",
        width: "100%",
        flex: "1 1 auto",
        overflowY: "auto"
      }}
    >
      {props.children}
    </div>
  </div>
);

interface OpenState {
  isToolbarOpen: boolean;
  isToolbarOpenOnChange: (isToolbarOpen: boolean) => void;
}

const Mobile = (props: Props & OpenState): React.ReactElement<any> => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}
  >
    {props.isToolbarOpen ? props.toolbar : props.children}

    <ActionIcon
      onClick={() => props.isToolbarOpenOnChange(!props.isToolbarOpen)}
      icon={props.isToolbarOpen ? close : menu}
    />
  </div>
);

const Full = (props: Props): React.ReactElement<any> => {
  const View = compose(
    withProps(props),
    withState(
      "isToolbarOpen",
      "isToolbarOpenOnChange",
      false
    )
  )(Mobile);
  return <View />;
};

export default responsive({
  desktopView: Desktop,
  mobileView: Full
});