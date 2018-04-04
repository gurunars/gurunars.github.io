import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
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
      title="Sample Title" 
      onClick={action("onClick")} />
  )); 