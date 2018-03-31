import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";

import TabbedSite from ".";

const getTab = (title: string) => ({
  alias: title,
  tab:
    (
      <p
        style={{
          height: "100%",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: title
        }}
      >
        {title}
      </p>
    ),
  content:
    (
      <p
        style={{
          padding: "10px",
          width: "100%",
          backgroundColor: title
        }}
      >
        {title}
      </p>
    )
});

const PAGES = ["white", "yellow", "red", "green", "blue"];

storiesOf("TabbedSite", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <TabbedSite
      pages={PAGES.map(getTab)}
      selectedPage="yellow"
      selectedPageOnChange={page => action("click")(page)}
    />
  ));
