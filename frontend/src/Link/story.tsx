import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import { Url, CircleUrl } from ".";

storiesOf("Link", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("Url", () => (
    <Url 
      link={{
        name: "FOO",
        url: "bar"
      }} 
    />
  ))
  .add("CircleUrl without type", () => (
    <CircleUrl
      link={{
        name: "FOO",
        url: "bar"
      }} 
    />
  )); 