import * as React from "react";

export default interface Props {
  size: number;
  selectedPostion: number;
  children: (pos: number) => React.ReactElement<any>;
  close: () => void;
  goTo: (targetPosition: number) => void;
}