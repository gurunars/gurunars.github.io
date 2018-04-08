import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import PageWithOverlay from ".";

storiesOf("PageWithOverlay", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("With overlay", () => (
    <PageWithOverlay
      foregroundContent={<p>Foreground content</p>}
    > 
      <p>Background content</p>
    </PageWithOverlay>
  ))
  .add("Without overlay", () => (
    <PageWithOverlay> 
      <p>Background content</p>
    </PageWithOverlay>
  )); 