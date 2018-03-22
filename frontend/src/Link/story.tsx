import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";

import Link from ".";

storiesOf("HashAware", module)
  .addDecorator(centered)
  .add("basic", () => (
    <div>
      <Link params={{ "one": "ONE" }}>
        {isActive => <p>One: {isActive}</p>}
      </Link>
      <br />
      <Link params={{ "two": "TWO" }}>
        {isActive => <p>Two: {isActive}</p>}
      </Link>
      <br />
      <Link params={{ "three": "THREE" }}>
        {isActive => <p>Three: {isActive}</p>}
      </Link>
    </div>
  ));
