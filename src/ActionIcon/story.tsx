import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { host } from "storybook-host";
import { ReactComponent as Close } from "./close.svg";

import ActionIcon from ".";

storiesOf("ActionIcon", module)
  .addDecorator(
    host({
      align: "center middle",
      height: 60,
      width: 60
    })
  )
  .add("basic", () => (
    <ActionIcon
      rotation={0}
      scale={1}
      icon={<Close />}
      onClick={action("onClick")}
    />
  ));
