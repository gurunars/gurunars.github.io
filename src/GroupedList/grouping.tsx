import _ from "lodash";

import { GroupedItems } from "./interfaces";

export const groupItems = <T extends {}>(
  items: T[],
  groupBy: (item: T) => Object,
  sortBy: (item: T) => Object,
  reverse?: boolean
): Array<GroupedItems<T>> =>
  _.orderBy(
    _.map(_.groupBy(items, groupBy), (elements, group) => ({
      group,
      elements: _.orderBy(elements, sortBy, reverse ? "desc" : "asc")
    })),
    "group",
    reverse ? "desc" : "asc"
  );
