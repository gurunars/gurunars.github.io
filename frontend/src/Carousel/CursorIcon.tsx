import * as React from "react";
import Link from "../Link";

const CursorIcon = (props: {
  icon: React.ReactElement<any>,
  reference?: Object
}) => {
  const dims = 30;
  const icon = (
    <div
      style={{
        position: "relative",
        color: props.reference ? "black" : "gray",
        width: dims,
        height: dims
      }}
    >{props.icon}
    </div>
  );
  return props.reference ? (
    <Link params={props.reference}>{icon}</Link>
  ) : icon;
};

export default CursorIcon;