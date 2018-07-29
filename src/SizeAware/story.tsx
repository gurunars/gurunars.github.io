import centered from "@storybook/addon-centered";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import SizeAware from ".";

storiesOf("SizeAware", module)
  .addDecorator(centered)
  .add("basic", () => (
    <SizeAware>
      {(width, height) => <div>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
      </div>}
    </SizeAware>
  ));
