import * as React from "react";
import * as _ from "lodash";
import { Spec, GroupSpec, SpecSelection, GroupSpecSelection } from "../Toolbar";
import BaseToolbar from "../Toolbar";
import { Small, Large, Item, getId } from "../Item";
import WithToolbar from "../WithToolbar";

import Carousel from "../Carousel";
import PageWithOverlay from "../PageWithOverlay";
import GroupedList from "../GroupedList";
import { groupItems } from "../GroupedList/grouping";

import { Portfolio } from "../model";
import PageWithSideMenu, { MenuVisibility } from "../PageWithSideMenu";
import About from "../About";

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
    humanReadableName: "Full Time Job",
    color: "Lavender"
  },
  education: {
    humanReadableName: "Education",
    color: "Silver"
  }
};

export const Groups: { [key: string]: GroupSpec<Item> } = {
  "year": {
    humanReadableName: "Year",
    groupBy: (item: Item) => item.duration.start.getUTCFullYear(),
    sortBy: (item: Item) => item.duration.start,
    reverse: true
  },
  "type": {
    humanReadableName: "Type",
    groupBy: (item: Item) => TypeToSpecMapping[item.type].humanReadableName,
    sortBy: (item: Item) => TypeToSpecMapping[item.type].humanReadableName,
    reverse: false
  },
  "title": {
    humanReadableName: "Title",
    groupBy: (item: Item) => item.title[0].toUpperCase(),
    sortBy: (item: Item) => item.title,
    reverse: false
  },
  "location": {
    humanReadableName: "Location",
    groupBy: (item: Item) => item.location.name,
    sortBy: (item: Item) => item.location.name,
    reverse: false
  }
};

const filterItems = (items: Item[], types: string[]): Item[] =>
  types.length === 0 ? items : _.filter(items, item => types.indexOf(item.type) === -1);

const Toolbar = (props: SpecSelection & GroupSpecSelection) => (
  <BaseToolbar
    groupMapping={Groups}
    filterMapping={TypeToSpecMapping}
    {...props}
  />
);

interface IdHodler {
  selectedId: number | null;
  selectedIdOnChange: (selectedId: number | null) => void;
}

const Main = (props: {
  portfolio: Portfolio,
} & IdHodler & SpecSelection & GroupSpecSelection & MenuVisibility) => {
  const group = Groups[props.selectedGroup || "year"];
  const filtered = filterItems(props.portfolio.items, props.selectedSpecs || []);
  const grouped = groupItems(
    filtered,
    group.groupBy,
    group.sortBy,
    group.reverse
  );
  const flattened = _.flatMap(grouped, grp => grp.elements);
  const selectedPosition = _.findIndex(flattened, item => props.selectedId === getId(item));
  return (
    <PageWithSideMenu
      menu={
        <About
          meta={props.portfolio.meta}
        />
      }
      menuTitle="FOO"
      contentTitle="BAR"
      {...props}
    >
      <PageWithOverlay
        foregroundContent={
          selectedPosition > -1 ? (
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
            renderItem={({ item }: { item: Item }) => (
              <Small
                style={{
                  backgroundColor: TypeToSpecMapping[item.type].color
                }}
                item={item}
                onClick={() => props.selectedIdOnChange(getId(item))}
              />
            )}
          />
        </WithToolbar>
      </PageWithOverlay>
    </PageWithSideMenu>
  );
};

export default Main;