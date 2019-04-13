import * as _ from "lodash";
import * as React from "react";

const CursorIcon = (props: {
  icon: React.ReactElement<any>;
  keyboardButton?: string;
  targetPosition: number | null;
  goTo: (targetPosition: number) => void;
}) => {
  const dims = 30;
  const isEmpty = _.isNil(props.targetPosition);

  const goTo = () => (isEmpty ? null : props.goTo(props.targetPosition || 0));

  return (
    <div
      onClick={goTo}
      tabIndex={0}
      onKeyPress={event => {
        console.log(event);
        if (event.key === props.keyboardButton) {
          goTo();
        }
      }}
      style={{
        position: "relative",
        color: isEmpty ? "gray" : "black",
        cursor: isEmpty ? "not-allowed" : "pointer",
        width: dims,
        height: dims
      }}
    >
      {props.icon}
    </div>
  );
};

export default CursorIcon;
