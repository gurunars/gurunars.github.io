import * as React from "react";

import responsive from "../Responsive";

const OverlayDecorator = (props: { children: React.ReactElement<any> }) => (
  <div
    style={{
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      top: "0%",
      left: "0%",
      zIndex: 3,
      width: "100%",
      height: "100%"
    }}
  >
    <div
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 100,
        top: "5%",
        left: "5%",
        width: "90%",
        height: "90%",
        backgroundColor: "white"
      }}
    >
      {props.children}
    </div>
  </div>
);

interface Props {
  children: React.ReactElement<any>;
  foregroundContent?: React.ReactElement<any> | null;
}

const Desktop = (props: Props) => (
  props.foregroundContent ?
    (
      <div
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        {props.children}
        <OverlayDecorator>{props.foregroundContent}</OverlayDecorator>
      </div>
    ) : props.children
);

const Mobile = (props: Props) => props.foregroundContent ?
  props.foregroundContent : props.children;

export default responsive({
  desktopView: Desktop,
  mobileView: Mobile
});
