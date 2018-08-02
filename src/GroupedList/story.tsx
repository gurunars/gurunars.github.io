import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";

import addMultiSize from "../Responsive/multitype";

import Grouping from ".";
import { groupItems } from "./grouping";

interface Item {
  type: string;
  title: string;
}

const items: Item[] = [
  { type: "two", title: "D" },
  { type: "two", title: "F" },
  { type: "two", title: "E" },
  { type: "one", title: "B" },
  { type: "one", title: "C" },
  { type: "three", title: "G" },
  { type: "three", title: "I" },
  { type: "one", title: "A" },
  { type: "three", title: "H" }
];

const story = storiesOf("GroupedList", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }));

addMultiSize(story, () => (
  <Grouping
    items={groupItems(items, item => item.type, item => item.title)}
    renderItem={(props: { item: Item }) => <h1>{props.item.title}</h1>}
  />
));