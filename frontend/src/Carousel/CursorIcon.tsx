import * as React from "react";

const CursorIcon = (props: {
  icon: React.ReactElement<any>,
  targetPosition: number | null,
  goTo: (targetPosition: number) => void
}) => {
  const dims = 30;
  return (
    <div
      onClick={() => props.targetPosition ? props.goTo(props.targetPosition) : null}
      style={{
        position: "relative",
        color: props.targetPosition ? "black" : "gray",
        width: dims,
        height: dims
      }}
    >{props.icon}
    </div>
  );
};

export default CursorIcon;