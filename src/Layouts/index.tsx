import * as React from "react";

import responsive from "../Responsive";
import { merge } from "../utils";

export const FullSize = (props: {
  children: React.ReactNode,
  style?: React.CSSProperties
}): React.ReactElement<any> => (
    <div
      style={
        merge(
          {
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%"
          },
          props.style || {}
        )}
    > {props.children}
    </div >
  );

interface Props {
  tabletAsMobile?: boolean,
  children: React.ReactNode,
  style?: React.CSSProperties
}

const isVertical = (type: "M" | "T" | "D", props: Props): boolean => {
  switch (type) {
    case "M":
      return true;
    case "T":
      return props.tabletAsMobile || false;
    case "D":
    default:
      return false;
  }
};

const IResponsiveFlex = (type: "M" | "T" | "D", props: Props): React.ReactElement<any> => (
  <div
    style={
      merge(
        {
          alignItems: isVertical(type, props) ? "initial" : "center",
          display: "flex",
          flexDirection: isVertical(type, props) ? "column" : "row"
        },
        props.style || {}
      )}
  >{props.children}
  </div>
);

export const ResponsiveFlex: (props: Props) => React.ReactElement<any> = responsive({
  desktopView: IResponsiveFlex.bind(null, "D"),
  tabletView: IResponsiveFlex.bind(null, "T"),
  mobileView: IResponsiveFlex.bind(null, "M")
});