import * as React from "react";

import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import Shortener from ".";

const links = [
  {
    alias: "bar",
    name: "FOO",
    url: "/bar.html"
  }
];

storiesOf("Shortener", module)
  .addDecorator(
    host({
      align: "center middle",
      height: 600,
      width: 800
    })
  )
  .add("basic", () => (
    <Shortener links={links}>
      <a href="#sh/bar">REDIR</a>
      <br />
      <a href="#not-sh/bar">NO REDIR</a>
    </Shortener>
  ));
