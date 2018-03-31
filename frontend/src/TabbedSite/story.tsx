import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";

import TabbedSite from ".";

const PAGES = [
  {
    alias: "one",
    tab: <p>One</p>,
    content: <p>ONE</p>
  }, {
    alias: "two",
    tab: <p>Two</p>,
    content: <p>TWO</p>
  }
];

storiesOf("TabbedSite", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <TabbedSite
      pages={PAGES}
      selectedPage="one"
      selectedPageOnChange={page => action("click")(page)}
    />
  ));
