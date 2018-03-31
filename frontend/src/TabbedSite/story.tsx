import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";

import TabbedSite from ".";

const BORDER = "1px solid black";

const getTab = (title: string) => ({
  alias: title,
  tab:
    (
      <p
        style={{
          height: "100%",
          borderTop: BORDER,
          borderLeft: BORDER,
          borderRight: BORDER,
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
      <div
        style={{
          padding: "10px",
          height: "100%",
          width: "100%",
          backgroundColor: title
        }}
      >
        <p>{title}</p>
      </div>
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
