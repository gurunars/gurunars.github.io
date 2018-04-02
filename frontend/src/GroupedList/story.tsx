import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import { Desktop } from ".";
import { groupItems } from "./grouping";

interface Item {
  type: string;
  title: string;
}

const items: Item[] = [
  {"type": "one", "title": "A"},
  {"type": "one", "title": "B"},
  {"type": "one", "title": "C"},
  {"type": "two", "title": "D"},
  {"type": "two", "title": "E"},
  {"type": "two", "title": "F"},
  {"type": "three", "title": "G"},
  {"type": "three", "title": "H"},
  {"type": "three", "title": "I"}
];

storiesOf("GroupedList", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <Desktop 
      items={groupItems(items, "type", "title")} 
      renderItem={(props: {item: Item}) => <h1>{props.item.title}</h1>} 
    />
  )); 