import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import CursorIcon from "./CursorIcon";

import next from "./next";
import prev from "./prev";

storiesOf("Carousel", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("Icon with reference", () => (
    <div>
      <CursorIcon
        icon={next}
        reference={{
          id: "FOOBAR"
        }}
      />
      <CursorIcon
        icon={prev}
        reference={{
          id: "FOOBAR"
        }}
      />
    </div>
  ))
  .add("Icon without reference", () => (
    <div>
      <CursorIcon
        icon={next}
      />
      <CursorIcon
        icon={prev}
      />
    </div>
  )); 