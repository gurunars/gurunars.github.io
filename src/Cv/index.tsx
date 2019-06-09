import React from "react";

import { RawGroupedList } from "../GroupedList";
import { groupItems } from "../GroupedList/grouping";
import { Item, Large } from "../Item";
import { Portfolio } from "../model";
import { groups } from "../Site";

const Cv = (props: { portfolio: Portfolio }): React.ReactElement<any> => {
  const group = groups.type;
  return (
    <div
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <RawGroupedList
        items={groupItems(
          props.portfolio.items,
          group.groupBy,
          group.sortBy,
          group.reverse
        )}
        renderItem={({ item }: { item: Item }) => <Large item={item} />}
      />
    </div>
  );
};

export default Cv;
