import * as React from "react";

const CursorIcon = <T extends {}>(props: {
  icon: (color?: string) => React.ReactElement<any>,
  reference?: T | null
}) => {
  const style: React.CSSProperties = {
    position: "relative",
    width: "30px",
    height: "30px"
  };
  if (props.reference) {
    return (
      <div style={style}>
        {props.icon()}
      </div>
    );
  } else {
    return (
      <div style={style}>
        {props.icon("red")}
      </div>
    );
  }
};

export default CursorIcon;