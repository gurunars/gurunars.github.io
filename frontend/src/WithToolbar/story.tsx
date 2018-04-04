import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import WithToolbar from ".";

storiesOf("WithToolbar", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <WithToolbar 
      toolbar={<p>TOOLBAR</p>}
      content={<p>CONTENT</p>}
    />
  )); 