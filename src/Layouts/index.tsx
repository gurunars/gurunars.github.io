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

type Props = {
  children: React.ReactNode,
  style?: React.CSSProperties
};

const IResponsiveFlex = (isVertical: boolean, props: Props): React.ReactElement<any> => (
  <div
    style={
      merge(
        {
          alignItems: isVertical ? "initial" : "center",
          display: "flex",
          flexDirection: isVertical ? "column" : "row"
        },
        props.style || {}
      )}
  >{props.children}
  </div>
);

export const ResponsiveFlex: (props: Props) => React.ReactElement<any> = responsive({
  desktopView: IResponsiveFlex.bind(null, false),
  mobileView: IResponsiveFlex.bind(null, true)
});