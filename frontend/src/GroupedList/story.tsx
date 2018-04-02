import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import { Desktop, RenderItem } from ".";
import { groupItems, GroupedItems } from "./grouping";

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

const grouped: GroupedItems<Item>[] = groupItems(items, "type", "title");

const renderItem: RenderItem<Item> = (item: Item) =>
  <h1>{item.title}</h1>;

storiesOf("GroupedList", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <Desktop items={grouped} renderItem={renderItem} />
  )); 