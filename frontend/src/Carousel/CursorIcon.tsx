import * as React from "react";

const CursorIcon = <T extends {}>(props: {
  icon: string,
  reference?: T | null
}) => {
  const dims = 30;
  const icon = (
    <img
      style={{
        width: dims,
        height: dims
      }}
      src={props.icon}
    />
  );
  if (props.reference) {
    return (
      <span>
        {icon}
      </span>
    );
  } else {
    return (
      <span style={{ fill: "red" }}>
        {icon}
      </span>
    );
  }
};

export default CursorIcon;