import { storiesOf } from "@storybook/react";
import * as React from "react";
import { compose } from "recompose";
import { host } from "storybook-host";

import RawWithToolbar from ".";
import { withBoxState } from "../Box";
import addMultiSize from "../Responsive/multitype";

const WithToolbar = compose(
  withBoxState("isToolbarOpen", false)
)(RawWithToolbar);

const story = storiesOf("WithToolbar", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }));

addMultiSize(story, () => (
  <WithToolbar>
    <p>CONTENT</p>
  </WithToolbar>
));
