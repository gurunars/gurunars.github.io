import { storiesOf } from "@storybook/react";
import * as React from "react";
import { compose, withProps } from "recompose";
import { host } from "storybook-host";

import RawWithToolbar from ".";
import { withBoxState } from "../Box";

const WithToolbarDesktop = compose(
  withProps({ toolbar: (<p>TOOLBAR</p>) }),
  withBoxState("isToolbarOpen", false)
)(RawWithToolbar);

const WithToolbarMobile = compose(
  withProps({
    type: "mobile",
    toolbar: (<p>TOOLBAR</p>)
  }),
  withBoxState("isToolbarOpen", false)
)(RawWithToolbar);

storiesOf("WithToolbar", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("desktop", () => (
    <WithToolbarDesktop>
      <p>CONTENT</p>
    </WithToolbarDesktop>
  ))
  .add("mobile", () => (
    <WithToolbarMobile>
      <p>CONTENT</p>
    </WithToolbarMobile>
  ));