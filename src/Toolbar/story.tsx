import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { compose, withProps } from "recompose";
import { withBoxState } from "../Box";

import Toolbar from ".";

const StateToolbar = compose(
  withProps({
    "filterMapping": {
      one: {
        humanReadableName: "One",
        color: "Yellow"
      },
      two: {
        humanReadableName: "Two",
        color: "LightGreen"
      }
    },
    "groupMapping": {
      one: {
        humanReadableName: "One",
        groupBy: "group-by-one",
        sortBy: "sort-by-one",
        reverse: true
      },
      two: {
        humanReadableName: "Two",
        groupBy: "group-by-two",
        sortBy: "sort-by-two",
        reverse: false
      }
    }
  }),
  withBoxState("selectedSpecs", []),
  withBoxState("selectedGroup", null)
)(Toolbar);

storiesOf("Toolbar", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("basic", () => <StateToolbar />);