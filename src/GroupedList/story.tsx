import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import Grouping from ".";
import { groupItems } from "./grouping";

interface Item {
  type: string;
  title: string;
}

const items: Item[] = [
  { "type": "two", "title": "D" },
  { "type": "two", "title": "F" },
  { "type": "two", "title": "E" },
  { "type": "one", "title": "B" },
  { "type": "one", "title": "C" },
  { "type": "three", "title": "G" },
  { "type": "three", "title": "I" },
  { "type": "one", "title": "A" },
  { "type": "three", "title": "H" }
];

storiesOf("GroupedList", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("desktop", () => (
    <Grouping
      items={groupItems(items, item => item.type, item => item.title)}
      renderItem={(props: { item: Item }) => <h1>{props.item.title}</h1>}
    />
  ))
  .add("mobile", () => (
    <Grouping
      items={groupItems(items, item => item.type, item => item.title)}
      renderItem={(props: { item: Item }) => <h1>{props.item.title}</h1>}
    />
  ));