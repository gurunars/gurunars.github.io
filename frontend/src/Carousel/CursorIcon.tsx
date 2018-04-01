import * as React from "react";

const CursorIcon = <T extends {}>(props: {
  icon: React.ReactElement<any>,
  reference?: T | null
}) => {
  const dims = 30;
  const style: React.CSSProperties = {
    position: "relative",
    width: dims,
    height: dims
  };
  if (props.reference) {
    return (
      <div style={style}>{props.icon}</div>
    );
  } else {
    return (
      <div style={Object.assign(style, { color: "red" })}>{props.icon}</div>
    );
  }
};

export default CursorIcon;