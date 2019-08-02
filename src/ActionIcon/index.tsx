import _ from "lodash";
import React from "react";

import { merge } from "../utils";

const ActionIcon = (props: {
  icon: JSX.Element;
  onClick: () => void;
  rotation: number;
  scale: number;
  style?: React.CSSProperties;
}): React.ReactElement<any> => (
  <div
    onClick={props.onClick}
    style={merge(
      {
        height: 40,
        width: 40,
        borderRadius: "50%",
        backgroundColor: "#1B2E3C",
        display: "flex",
        alignItems: "center",
        zIndex: 30,
        cursor: "pointer",
        justifyContent: "center",
        color: "white"
      },
      props.style || {}
    )}
  >
    <div
      style={{
        width: "70%",
        height: "70%",
        transform:
          "rotate(" +
          props.rotation +
          "deg)" +
          " " +
          "scale(" +
          props.scale +
          ")",
        fill: _.get(props.style, "color", "black")
      }}
    >
      {props.icon}
    </div>
  </div>
);

export default ActionIcon;
