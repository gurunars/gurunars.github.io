import * as _ from "lodash";

export interface GroupedItems<T extends {}> {
  group: string;
  elements: T[];
}

export const groupItems = <T extends {}> (
  items: T[],
  groupBy: string | ((item: T) => Object),
  sortBy: string | ((item: T) => Object),
  reverse?: boolean
): GroupedItems<T>[] => 
  _.orderBy(
    _.map(_.groupBy(items, groupBy), (elements, group) => ({
      group: group,
      elements: _.orderBy(elements, sortBy, reverse ? "desc" : "asc")
    })), 
    "key",
    reverse ? "desc" : "asc"
  );
