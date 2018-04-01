import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";

import Carousel from ".";

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
  .add("Previous and next", () => (
    <Carousel
      items={items}
      selectedPostion={1}
      close={action("CLOSE")}
      goTo={action("GO TO")}
    >
      {(current: Item) => (<div>{current.title}</div>)}
    </Carousel>
  ));