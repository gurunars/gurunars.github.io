import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";
// tslint:disable-next-line:no-implicit-dependencies
import { Story } from "storybook__react";

import { SizeContext } from "../SizeAware";

const addMultiSize = (
  story: Story,
  children: () => React.ReactElement<any>
) => {
  story
    .add("desktop", () => (
      <SizeContext.Provider value={{
        width: 3000,
        height: 100
      }}>
        {children()}
      </ SizeContext.Provider >
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
      <SizeContext.Provider value={{
        width: 500,
        height: 100
      }}>
        {children()}
      </ SizeContext.Provider >
    ));
};

export const multiTypeStory = (
  name: string,
  children: () => React.ReactElement<any>
) => {
  const story = storiesOf(name, module)
    .addDecorator(host({
      align: "center middle",
      height: 600,
      width: 800,
    }));

  addMultiSize(story, children);
};

export default addMultiSize;