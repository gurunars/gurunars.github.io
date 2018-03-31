import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, withProps, compose } from "recompose";

import PlainTabbedSite, { PageCollection } from ".";

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

const TabbedSite = compose(
  withProps(
    { "pages": PAGES.map(getTab) }
  ),
  withState(
    "selectedPage",
    "selectedPageOnChange",
    (props: PageCollection) => props.pages[0].alias
  )
)(PlainTabbedSite);

storiesOf("TabbedSite", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <TabbedSite />
  ));
