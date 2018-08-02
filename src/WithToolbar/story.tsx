import * as React from "react";
import { compose } from "recompose";

import RawWithToolbar from ".";
import { withBoxState } from "../Box";
import multiTypeStory from "../Responsive/multitype";

const WithToolbar = compose(
  withBoxState("isToolbarOpen", false)
)(RawWithToolbar);

multiTypeStory("WithToolbar", () => (
  <WithToolbar>
    <p>CONTENT</p>
  </WithToolbar>
));
