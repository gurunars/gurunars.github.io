import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";

import Icon from ".";

import sampleIcon from "./sampleIcon.svg";

storiesOf("Icon", module)
  .addDecorator(host({
    align: "center middle",
    height: 50,
    width: 50,
  }))
  .add("basic", () => (
    <Icon src={sampleIcon} style={{
      color: "red",
      width: "50px",
      height: "50px"
    }} />
  ));