import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";
import icon from "./close.svg";

import ActionIcon from ".";

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