import * as React from "react";
import { compose, withProps } from "recompose";
import { withBoxState } from "../Box";

import Toolbar from ".";
import multiTypeStory from "../Responsive/multitype";

const StateToolbar = compose(
  withProps({
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
    },
    allTags: {
      one: 1,
      two: 2
    }
  }),
  withBoxState("selectedSpecs", ["one"]),
  withBoxState("selectedGroup", "one"),
  withBoxState("selectedTag", "one")
)(Toolbar);

multiTypeStory("Toolbar", () => <StateToolbar />);
