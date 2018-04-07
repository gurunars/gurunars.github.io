import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, compose, withProps } from "recompose";

import Toolbar from ".";

const StateToolbar = (isVertical?: boolean): React.ReactElement<any> => {
  const View = compose(
    withProps({
      "isVertical": isVertical,
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
    withState(
      "selectedSpecs",
      "selectedSpecsOnChange",
      []
    ),
    withState(
      "selectedGroup",
      "selectedGroupOnChange",
      null
    )
  )(Toolbar);
  return <View />;
};

storiesOf("Toolbar", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("horizontal", () => StateToolbar(false))
  .add("vertical", () => StateToolbar(true));