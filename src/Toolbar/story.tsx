import * as React from "react";
import { compose, withProps } from "recompose";
import { withBoxState } from "../Box";

import Toolbar from ".";
import { META } from "../About/story";
import multiTypeStory from "../Responsive/multitype";

const StateToolbar = compose(
  withProps({
    meta: META,
    filterMapping: {
      one: {
        humanReadableName: "One",
        color: "Yellow"
      },
      two: {
        humanReadableName: "Two",
        color: "LightGreen"
      }
    },
    groupMapping: {
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

multiTypeStory("Toolbar", () => <StateToolbar />);