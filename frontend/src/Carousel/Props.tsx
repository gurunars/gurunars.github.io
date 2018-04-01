import * as React from "react";

export default interface Props<T extends {}> {
  items: T[];
  selectedPostion: number;
  children: (item: T) => React.ReactElement<any>;
  close: () => void;
  goTo: (targetPosition: number) => void;
}