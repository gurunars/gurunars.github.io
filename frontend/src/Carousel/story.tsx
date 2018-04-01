import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import Desktop from "./Desktop";
import { Item } from "./Cursor";

interface MyItem extends Item {
  title: string;
}

const item: MyItem = {
  id: "one",
  title: "Item one"
};

const items: MyItem[] = [
  {
    id: "zero",
    title: "Item zero"
  },
  item,
  {
    id: "two",
    title: "Item two"
  }
];

storiesOf("Carousel", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("Desktop/previous and next", () => (
    <Desktop
      items={items}
      selectedId="one"
    >
      {(current: MyItem) => (<div>{current.title}</div>)}
    </Desktop>
  )); 