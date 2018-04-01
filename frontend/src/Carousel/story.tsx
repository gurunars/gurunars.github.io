import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import CursorIcon from "./CursorIcon";

const next = require("./next.svg");

storiesOf("Carousel", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <CursorIcon
      icon={next}
      reference={{
        id: "FOOBAR"
      }}
    />
  )); 