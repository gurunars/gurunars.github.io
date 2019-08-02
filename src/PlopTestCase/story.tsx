import React from "react";
import { storiesOf } from "@storybook/react";

import PlopTestCase from ".";
import Centralized from "Centralized";

storiesOf("PlopTestCase", module).add("basic", () => (
  <Centralized>
    <PlopTestCase />
  </Centralized>
));
