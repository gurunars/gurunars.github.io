import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import PlainDesktop from "./Desktop";
import PlainMobile from "./Mobile";
import Props from "./Props";

interface Item {
  title: string;
}

const item: Item = {
  title: "Item one"
};

const items: Item[] = [
  {
    title: "Item zero"
  },
  item,
  {
    title: "Item two"
  }
];

storiesOf("Carousel", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("Mobile/previous and next", () => (
    <Mobile
      items={items}
      selectedPostion={1}
    >
      {(current: Item) => (<div>{current.title}</div>)}
    </Mobile>
  ))
  .add("Desktop/previous and next", () => (
    <Desktop
      items={items}
      selectedPostion={1}
    >
      {(current: Item) => (<div>{current.title}</div>)}
    </Desktop>
  )); 