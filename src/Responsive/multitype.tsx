import { storiesOf } from "@storybook/react";
import * as React from "react";
// tslint:disable-next-line:no-implicit-dependencies

import { SizeContext } from "../SizeAware";

const multiTypeStory = (
  name: string,
  children: () => React.ReactElement<any>
) => {

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10
  };

  storiesOf(name, module)
    .add("desktop", () => (
      <div style={style}>
        <div style={{
          width: "100%",
          height: 600,
          border: "1px dotted black"
        }}>
          <SizeContext.Provider value={{
            width: 3000,
            height: 100
          }}>
            {children()}
          </SizeContext.Provider>
        </div>
      </div>
    ))
    /*
    // I do not have tablet specific layouts
    .add("tablet", () => (
      <SizeContext.Provider value={{
        width: 1000,
        height: 100
      }}>
        {children()}
      </ SizeContext.Provider >
    ))
    */
    .add("mobile", () => (
      <div style={style}>
        <div style={{
          width: 500,
          height: 600,
          border: "1px dotted black"
        }}>
          <SizeContext.Provider value={{
            width: 500,
            height: 100
          }}>
            {children()}
          </SizeContext.Provider>
        </div>
      </div>
    ));
};

export default multiTypeStory;