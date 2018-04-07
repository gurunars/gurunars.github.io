import * as React from "react";
import * as _ from "lodash";
import { Spec, GroupSpec, SpecSelection, GroupSpecSelection } from "../Toolbar";
import BaseToolbar from "../Toolbar";
import { ResponsiveFlex } from "../Layouts";
import { Small, Large, Item } from "../Item";
import WithToolbar from "../WithToolbar";

import Carousel from "../Carousel";
import PageWithOverlay from "../PageWithOverlay";
import GroupedList from "../GroupedList";
import { groupItems } from "../GroupedList/grouping";

export const TypeToSpecMapping: { [key: string]: Spec } = {
  openSource: {
    humanReadableName: "Open Source",
    color: "PaleGreen"
  },
  freelance: {
    humanReadableName: "Freelance",
    color: "MistyRose"
  },
  fullTimeJob: {
    humanReadableName: "Full time job",
    color: "Lavender"
  },
  education: {
    humanReadableName: "Education",
    color: "Silver"
  }
};

export const getTypeSpec = (type: string): Spec => TypeToSpecMapping[type] || {
  humanReadableName: "Unknown",
  color: "white"
};

export const Groups: { [key: string]: GroupSpec } = {
  "year": {
    humanReadableName: "year",
    groupBy: "year",
    sortBy: "timestamp",
    reverse: true
  },
  "type": {
    humanReadableName: "Type",
    groupBy: "humanReadableType",
    sortBy: "timestamp",
    reverse: false
  },
  "title": {
    humanReadableName: "Title",
    groupBy: "titleFirstChar",
    sortBy: "title",
    reverse: false
  },
  "location": {
    humanReadableName: "Location",
    groupBy: "locationName",
    sortBy: "timestamp",
    reverse: false
  }
};

const Toolbar = (props: SpecSelection & GroupSpecSelection) => (
  <BaseToolbar
    groupMapping={Groups}
    filterMapping={TypeToSpecMapping}
    {...props}
  />
);

const ColorItemView = (props: { item: Item, onClick: () => void }) => (
  <Small {...props} style={{ color: getTypeSpec(props.item.type).color }} />
);

interface PositionHolder {
  selectedPosition: number | null;
  selectedPositionOnChange: (selectedPosition: number | null) => void;
}

const Main = (props: {
  items: Item[],
} & PositionHolder & SpecSelection & GroupSpecSelection) => {
  const group = Groups[props.selectedGroup || "year"];
  const filtered = props.items;
  const grouped = groupItems(
    filtered,
    group.groupBy,
    group.sortBy,
    group.reverse
  );
  const flattened = _.flatMap(grouped, grp => grp.elements);
  return (
    <PageWithOverlay
      foregroundContent={
        !_.isNil(props.selectedPosition) ? (
          <Carousel
            size={flattened.length}
            selectedPostion={props.selectedPosition || 0}
            close={() => props.selectedPositionOnChange(null)}
            goTo={props.selectedPositionOnChange}
          >
            {pos => (<Large item={flattened[pos]} />)}
          </Carousel>
        ) : null
      }
    >
      <WithToolbar 
        toolbar={<Toolbar {...props} />} 
      >
        <p />
      </WithToolbar>
    </PageWithOverlay>
  );
};

/*
 <GroupedList 
        items={grouped}
        renderItem={({item}: {item: Item}) => (
          <Small 
            item={item} 
            onClick={() => props.selectedPositionOnChange(pos)} 
          />
        )}
      />
*/
