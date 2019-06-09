import _ from "lodash";
import React from "react";

import { merge } from "../utils";

const ActionIcon = (props: {
  icon: JSX.Element;
  onClick: () => void;
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
        position: "absolute",
        display: "flex",
        alignItems: "center",
        zIndex: 30,
        bottom: 20,
        right: 20,
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
        fill: _.get(props.style, "color", "black")
      }}
    >
      {props.icon}
    </div>
  </div>
);

export default ActionIcon;
