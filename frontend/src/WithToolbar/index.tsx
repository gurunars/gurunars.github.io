import * as React from "react";

import { withState, compose, withProps } from "recompose";

import close from "./icons/close";
import menu from "./icons/menu";

type Props = {
  toolbar: React.ReactElement<any>,
  content: React.ReactElement<any>
};

/*
const Desktop = (props: Props): React.ReactElement<any> => (
  <div
    style={{
      display: "flex",
      position: "relative",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    }}
  >
    <div 
      style={{
        height: 40,
        flex: "0 1 40px",
        width: "100%"
      }}
    >
    {props.toolbar}
    </div>
    <div 
      style={{
        position: "relative",
        width: "100%",
        flex: "1 1 auto",
        overflowY: "auto"
      }}
    >
    {props.content}
    </div>
  </div>
);
*/

interface OpenState {
  isToolbarOpen: boolean;
  isToolbarOpenOnChange: (isToolbarOpen: boolean) => void;
}

const Mobile = (props: Props & OpenState): React.ReactElement<any> => (
  <div 
    style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}
  >
    {props.isToolbarOpen ? props.toolbar : props.content}

    <div
      onClick={() => props.isToolbarOpenOnChange(!props.isToolbarOpen)}
      style={{
        height: 40,
        width: 40,
        borderRadius: "50%",
        border: "2px solid black",
        backgroundColor: "#1B2E3C",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        zIndex: 30,
        bottom: 20,
        right: 20,
        cursor: "pointer",
        justifyContent: "center",
        color: "white"
      }}
    >
      <div 
        style={{
          width: "70%",
          height: "70%"
        }}
      >
        {props.isToolbarOpen ? close : menu} 
      </div>
    </div>

  </div>
);

const Full = (props: Props): React.ReactElement<any> => {
  const View = compose(
    withProps(props),
    withState(
      "isToolbarOpen",
      "isToolbarOpenOnChange",
      false
    )
  )(Mobile);
  return <View />;
};

export default Full;