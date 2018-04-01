import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { host } from "storybook-host";

import Carousel from ".";

storiesOf("Carousel", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <Carousel 
      title="Sample Title" 
      onClick={action("onClick")} />
  )); 