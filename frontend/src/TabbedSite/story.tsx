import * as React from "react";
import * as _ from "lodash";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, withProps, compose } from "recompose";

import PlainTabbedSite, { PageCollection, TabPlacement } from ".";

const logoTab = {
  alias: "logo",
  color: "white",
  withBorder: false,
  tab:
    (
      <p
        style={{
          height: "100%",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        Logo
      </p>
    ),
  content:
    (
      <div
        style={{
          padding: "10px",
          height: "100%",
          width: "100%"
        }}
      >
        <p>LOGO</p>
      </div>
    )
};

const getTab = (title: string) => ({
  alias: title,
  color: title,
  withBorder: true,
  tab:
    (
      <p
        style={{
          height: "100%",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "10px",
          paddingRight: "10px"
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
          width: "100%"
        }}
      >
        <p>{title}</p>
      </div>
    )
});

const PAGES = ["yellow", "red", "green", "blue"];

const getTabbedSite = (placement: TabPlacement) => {
  const TabbedSite = compose(
    withProps({
      "pages": _.concat([logoTab], PAGES.map(getTab)),
      "tabPlacement": placement
    }),
    withState(
      "selectedPage",
      "selectedPageOnChange",
      (props: PageCollection) => props.pages[0].alias
    )
  )(PlainTabbedSite);
  return <TabbedSite />;
};

storiesOf("TabbedSite", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("Top tab bar", () => getTabbedSite("top"))
  .add("Left tab bar", () => getTabbedSite("left"))
  .add("Bottom tab bar", () => getTabbedSite("bottom"))
  .add("Right tab bar", () => getTabbedSite("right"));
