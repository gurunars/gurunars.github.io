import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, withProps, compose } from "recompose";

import PlainPageWithSideMenu from "./Desktop";

const enhance = compose(
  withState("menuIsVisible", "menuIsVisibleOnChange", true),
  withProps({
    menu: <div>MENU</div>,
    content: <div>CONTENT</div>
  })
);

const PageWithSideMenu = enhance(PlainPageWithSideMenu);

storiesOf("PageWithSideMenu", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <PageWithSideMenu />
  ));
