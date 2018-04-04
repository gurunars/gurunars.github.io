import * as React from "react";

const Desktop = (props: {
  toolbar: React.ReactElement<any>,
  content: React.ReactElement<any>
}): React.ReactElement<any> => (
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

const Mobile = (props: {
  toolbar: React.ReactElement<any>,
  content: React.ReactElement<any>,
  isToolbarOpen: boolean,
  isToolbarOpenOnChange: (isToolbarOpen: boolean) => void
}): React.ReactElement<any> => (
  <div 
    style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}
  >
    {props.isToolbarOpen ? props.toolbar : props.content}

    <div
      style={{
        height: 40,
        width: 40,
        borderRadius: "50%",
        border: "2px solid black",
        backgroundColor: "#1B2E3C",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        zIndex: 30,
        bottom: 20,
        right: 20,
        pointer: "cursor",
        justifyContent: "center",
      }}
    >
      <img 
        style={{
          width: "70%",
          height: "70%"
        }}
        src={props.isToolbarOpen ? close : open} 
      />

    </div>

  </div>
);