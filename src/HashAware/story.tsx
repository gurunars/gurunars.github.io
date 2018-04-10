import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";

import HashAware from ".";

storiesOf("HashAware", module)
  .addDecorator(centered)
  .add("basic", () => (
    <HashAware>
      {hash => <div>
        <p>Hash: {hash}</p>
      </div>}
    </HashAware>
  ));