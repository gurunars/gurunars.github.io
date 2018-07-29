import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";

import { CircleUrl, FullUrl, Url } from ".";

storiesOf("Link", module)
  .addDecorator(host({
    align: "center middle",
    height: 200,
    width: 200,
  }))
  .add("Url", () => (
    <Url
      link={{
        name: "FOO",
        url: "bar"
      }}
    />
  ))
  .add("FullUrl with type", () => (
    <FullUrl
      style={{
        color: "red"
      }}
      link={{
        name: "FOO",
        url: "bar",
        type: "amazon"
      }}
    />
  ))
  .add("CircleUrl with type", () => (
    <CircleUrl
      link={{
        name: "FOO",
        url: "bar",
        type: "amazon"
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