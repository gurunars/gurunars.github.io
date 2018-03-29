import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import Desktop from "./Desktop";

storiesOf("PageWithSideMenu", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <Desktop
      menu={<p>MENU</p>}
      content={<p>CONTENT</p>}
    />
  ));
