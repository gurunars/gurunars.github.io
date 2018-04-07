import * as React from "react";
import * as _ from "lodash";
import { Spec, GroupSpec, SpecSelection, GroupSpecSelection } from "../Toolbar";
import BaseToolbar from "../Toolbar";
import { ResponsiveFlex } from "../Layouts";
import { Small, Large, Item, getId } from "../Item";
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

const filterItems = (items: Item[], types: string[]): Item[] =>
  types.length === 0 ? items : _.filter(items, item => types.indexOf(item.type) > -1);

const Toolbar = (props: SpecSelection & GroupSpecSelection) => (
  <BaseToolbar
    groupMapping={Groups}
    filterMapping={TypeToSpecMapping}
    {...props}
  />
);

const ColoredItemView = (props: { item: Item, onClick: () => void }) => (
  <Small {...props} style={{ color: TypeToSpecMapping[props.item.type].color }} />
);

interface IdHodler {
  selectedId: number | null;
  selectedIdOnChange: (selectedId: number | null) => void;
}

const Main = (props: {
  items: Item[],
} & IdHodler & SpecSelection & GroupSpecSelection) => {
  const group = Groups[props.selectedGroup || "year"];
  const filtered = filterItems(props.items, props.selectedSpecs);
  const grouped = groupItems(
    filtered,
    group.groupBy,
    group.sortBy,
    group.reverse
  );
  const flattened = _.flatMap(grouped, grp => grp.elements);
  const selectedPosition = _.findIndex(flattened, item => props.selectedId === getId(item));
  return (
    <PageWithOverlay
      foregroundContent={
        !_.isNil(selectedPosition) ? (
          <Carousel
            size={flattened.length}
            selectedPostion={selectedPosition || 0}
            close={() => props.selectedIdOnChange(null)}
            goTo={pos => props.selectedIdOnChange(getId(flattened[pos]))}
          >
            {pos => (<Large item={flattened[pos]} />)}
          </Carousel>
        ) : null
      }
    >
      <WithToolbar 
        toolbar={<Toolbar {...props} />} 
      >
        <GroupedList 
          items={grouped}
          renderItem={({item}: {item: Item}) => (
            <Small 
              item={item} 
              onClick={() => props.selectedIdOnChange(getId(item))} 
            />
          )}
        />
      </WithToolbar>
    </PageWithOverlay>
  );
};
