import * as React from "react";
import Link from "../Link";

import { Item } from "./Cursor";

const CursorIcon = (props: {
  icon: React.ReactElement<any>,
  item?: Item | null
}) => {
  const dims = 30;
  const icon = (
    <div
      style={{
        position: "relative",
        color: props.item ? "black" : "gray",
        width: dims,
        height: dims
      }}
    >{props.icon}
    </div>
  );
  return props.item ? (
    <Link
      params={{
        id: props.item.id
      }}
    >{icon}
    </Link>
  ) : icon;
};

export default CursorIcon;