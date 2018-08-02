import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";

import Carousel from ".";
import addMultiSize from "../Responsive/multitype";

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

const story = storiesOf("Carousel", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }));

addMultiSize(story, () => (
  <Carousel
    size={items.length}
    selectedPostion={1}
    close={action("CLOSE")}
    goTo={action("GO TO")}
  >
    {(pos: number) => (<div>{items[pos].title}</div>)}
  </Carousel>
));