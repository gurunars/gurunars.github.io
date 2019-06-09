import centered from "@storybook/addon-centered";
import { storiesOf } from "@storybook/react";
import React from "react";

import SizeAware, { SizeContext } from ".";

storiesOf("SizeAware", module)
  .addDecorator(centered)
  .add("basic", () => (
    <SizeAware>
      <SizeContext.Consumer>
        {size => (
          <div>
            <p>Width: {size.width}</p>
            <p>Height: {size.height}</p>
          </div>
        )}
      </SizeContext.Consumer>
    </SizeAware>
  ));
