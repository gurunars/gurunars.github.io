import * as React from "react";

import ActionIcon from "../ActionIcon";
import Box from "../Box";
import { FullSize } from "../Layouts";
import responsive from "../Responsive";

import close from "./icons/close.svg";
import menu from "./icons/menu.svg";

interface Props {
  toolbar: React.ReactElement<any>;
  children: React.ReactElement<any>;
}

const Desktop = (props: Props): React.ReactElement<any> => (
  <FullSize
    style={{
      flexDirection: "column"
    }}
  >
    <div
      style={{
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
  </FullSize>
);

export interface OpenState {
  isToolbarOpen: Box<boolean>;
}

const Mobile = (props: Props & OpenState): React.ReactElement<any> => (
  <FullSize style={{ overflow: "hidden" }}>
    <FullSize style={{ overflowY: "auto", display: "initial" }}>
      {props.isToolbarOpen.get() ? props.toolbar : props.children}
    </FullSize>

    <ActionIcon
      onClick={() => props.isToolbarOpen.set(!props.isToolbarOpen.get())}
      icon={props.isToolbarOpen.get() ? close : menu}
    />
  </FullSize>
);

export default responsive({
  desktopView: Desktop,
  mobileView: Mobile
});