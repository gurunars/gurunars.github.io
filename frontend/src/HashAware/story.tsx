import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";

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
