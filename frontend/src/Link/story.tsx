import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";

import Link from ".";

storiesOf("Link", module)
  .addDecorator(centered)
  .add("basic", () => (
    <div>
      <Link params={{ "active": "ONE" }}>
        {isActive => <p>One: {isActive ? "yes" : "no"}</p>}
      </Link>
      <br />
      <Link params={{ "active": "TWO" }}>
        {isActive => <p>Two: {isActive ? "yes" : "no"}</p>}
      </Link>
      <br />
      <Link params={{ "active": "THREE" }}>
        {isActive => <p>Three: {isActive ? "yes" : "no"}</p>}
      </Link>
    </div>
  ));
