import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";

import Resizable from ".";

storiesOf("Resizable", module)
  .addDecorator(centered)
  .add("basic", () => (
    <Resizable>
      {(width, height) => <div>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
      </div>}
    </Resizable>
  ));
