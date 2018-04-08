import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { host } from "storybook-host";

import ActionIcon from ".";

const icon = require("./close.svg");

storiesOf("ActionIcon", module)
  .addDecorator(host({
    align: "center middle",
    height: 60,
    width: 60,
  }))
  .add("basic", () => (
    <ActionIcon
      icon={icon}
      onClick={action("onClick")}
    />
  )); 