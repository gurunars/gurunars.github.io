import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, compose, withProps } from "recompose";

import { SpecFilter } from ".";

const StateSpecFilter = compose(
  withProps({
    "mapping": {
      one: {
        humanReadableName: "One",
        color: "Yellow"
      },
      two: {
        humanReadableName: "Two",
        color: "LightGreen"
      }
    }
  }),
  withState(
    "selectedSpecs",
    "selectedSpecsOnChange",
    []
  )
)(SpecFilter);

storiesOf("Toolbar", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("SpecFilter", () => (
    <StateSpecFilter />
  )); 