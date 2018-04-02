import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { host } from "storybook-host";

import Item from ".";

const item = {
  title: "Title",
  achievements: [
    "one",
    "two",
    "three"
  ],
  location: {
    name: "Name of the loc",
    url: "url-to-loc"
  },
  references: [
    {
      name: "Name of the ref1",
      url: "url-to-ref1"
    }, {
      name: "Name of the ref2",
      url: "url-to-ref2"
    }, {
      name: "Name of the ref3",
      url: "url-to-ref3"
    }
  ],
  type: "sample-type",
  tags: ["one", "two", "three"],
  description: "Item description",
  links: [
    {
      name: "Name of the lnk1",
      url: "url-to-lnk1",
      type: "amazon"
    }, {
      name: "Name of the lnk2",
      url: "url-to-lnk2",
      type: "github"
    }, {
      name: "Name of the lnk3",
      url: "url-to-lnk3",
      type: "email"
    }
  ],
  duration: {
    start: new Date(2017, 11, 11, 11, 11, 11, 11)
  }
};

storiesOf("Item", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("small", () => (
    <Item
      item={item}
      openItem={action("OpenItem")}
    />
  )); 