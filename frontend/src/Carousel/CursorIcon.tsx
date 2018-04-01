import * as React from "react";

const CursorIcon = <T extends {}>(props: {
  icon: (color?: string) => React.ReactElement<any>,
  reference?: T | null
}) => {
  if (props.reference) {
    return (
      <span>
        {props.icon()}
      </span>
    );
  } else {
    return (
      <span>
        {props.icon("red")}
      </span>
    );
  }
};

export default CursorIcon;