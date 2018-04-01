import * as React from "react";

import responsive from "../Responsive";

const OverlayDecorator = (props: { children: React.ReactElement<any> }) => (
  <div
    style={{
      position: "fixed",
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
        position: "fixed",
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

type Props = {
  backgroundContent: React.ReactElement<any>,
  foregroundContent?: React.ReactElement<any>
};

const Desktop = (props: Props) => (
  props.foregroundContent ?
    (
      <div
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        {props.backgroundContent}
        <OverlayDecorator>{props.foregroundContent}</OverlayDecorator>
      </div>
    ) : props.backgroundContent
);

const Mobile = (props: Props) => props.foregroundContent ?
  props.foregroundContent : props.backgroundContent;

export default responsive({
  desktopView: Desktop,
  mobileView: Mobile
});