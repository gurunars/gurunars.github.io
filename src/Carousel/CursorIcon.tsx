import * as _ from "lodash";
import * as React from "react";

const CursorIcon = (props: {
  icon: React.ReactElement<any>,
  targetPosition: number | null,
  goTo: (targetPosition: number) => void
}) => {
  const dims = 30;
  const isEmpty = _.isNil(props.targetPosition);
  return (
    <div
      onClick={() => isEmpty ? null : props.goTo(props.targetPosition || 0)}
      style={{
        position: "relative",
        color: isEmpty ? "gray" : "black",
        cursor: isEmpty ? "not-allowed" : "pointer",
        width: dims,
        height: dims
      }}
    >{props.icon}
    </div>
  );
};

export default CursorIcon;