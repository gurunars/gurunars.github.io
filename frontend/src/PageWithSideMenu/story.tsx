import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import PageWithSideMenu from ".";

storiesOf("PageWithSideMenu", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <PageWithSideMenu
      menu={<p>MENU</p>}
      content={<p>CONTENT</p>}
    />
  ));
