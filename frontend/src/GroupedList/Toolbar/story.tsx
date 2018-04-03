import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, compose, withProps } from "recompose";

import { SpecFilter, GroupBy } from ".";

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

const StateGroupBy = compose(
  withProps({
    "mapping": {
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
  withState(
    "selectedSpecs",
    "selectedSpecsOnChange",
    []
  )
)(GroupBy);

storiesOf("Toolbar", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("GroupBy", () => (
    <StateGroupBy />
  ))
  .add("SpecFilter", () => (
    <StateSpecFilter />
  )); 