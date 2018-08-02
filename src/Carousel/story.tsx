import { action } from "@storybook/addon-actions";
import * as React from "react";

import Carousel from ".";
import multiTypeStory from "../Responsive/multitype";

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

multiTypeStory("Carousel", () => (
  <Carousel
    size={items.length}
    selectedPostion={1}
    close={action("CLOSE")}
    goTo={action("GO TO")}
  >
    {(pos: number) => (<div>{items[pos].title}</div>)}
  </Carousel>
));