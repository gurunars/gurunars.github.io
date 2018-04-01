import * as React from "react";

const CursorIcon = <T extends {}>(props: {
  icon: string,
  reference?: T | null
}) => {
  const icon = <img src={props.icon} />;
  const style: React.CSSProperties = {
    position: "relative",
    width: "30px",
    height: "30px"
  };
  if (props.reference) {
    return (
      <div style={style}>{icon}</div>
    );
  } else {
    return (
      <div style={Object.assign(style, { fill: "red" })}>{icon}</div>
    );
  }
};

export default CursorIcon;