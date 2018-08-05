import * as _ from "lodash";
import * as React from "react";
import { getId, Item, Large, Small } from "../Item";
import BaseToolbar, {
  GroupSpecSelection,
  SpecSelection, TagSelection, TagSpec,
  TitleToGroupSpecMapping, TypeToSpecMapping
} from "../Toolbar";

import Carousel from "../Carousel";
import GroupedList from "../GroupedList";
import { groupItems } from "../GroupedList/grouping";
import PageWithOverlay from "../PageWithOverlay";

import Box from "../Box";
import { FullSize } from "../Layouts";
import { Portfolio } from "../model";
import PageWithSideMenu, { MenuVisibility } from "../PageWithSideMenu";

export const typeToSpecMapping: TypeToSpecMapping = {
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

export const groups: TitleToGroupSpecMapping<Item> = {
  year: {
    humanReadableName: "Year",
    groupBy: (item: Item) => item.duration.start.getUTCFullYear(),
    sortBy: (item: Item) => item.duration.start,
    reverse: true
  },
  type: {
    humanReadableName: "Type",
    groupBy: (item: Item) => typeToSpecMapping[item.type].humanReadableName,
    sortBy: (item: Item) => typeToSpecMapping[item.type].humanReadableName,
    reverse: false
  },
  title: {
    humanReadableName: "Title",
    groupBy: (item: Item) => item.title[0].toUpperCase(),
    sortBy: (item: Item) => item.title,
    reverse: false
  },
  location: {
    humanReadableName: "Location",
    groupBy: (item: Item) => item.location.name,
    sortBy: (item: Item) => item.location.name,
    reverse: false
  }
};

const filterItems = (items: Item[], types: string[]): Item[] =>
  _.filter(items, item => types.indexOf(item.type) !== -1);

const Toolbar = (props: { allTags: TagSpec } & SpecSelection & GroupSpecSelection & TagSelection) => (
  <BaseToolbar
    groupMapping={groups}
    filterMapping={typeToSpecMapping}
    {...props}
  />
);

interface IdHodler {
  selectedId: Box<number | null>;
}

const getTagMap = (tags: string[]): TagSpec => _.countBy(tags);

const Main = (props: {
  portfolio: Portfolio,
} & IdHodler & SpecSelection & GroupSpecSelection & MenuVisibility & TagSelection) => {
  const group = groups[props.selectedGroup.get()];
  const filtered = filterItems(props.portfolio.items, props.selectedSpecs.get());
  const grouped = groupItems(
    filtered,
    group.groupBy,
    group.sortBy,
    group.reverse
  );
  const flattened = _.flatMap(grouped, grp => grp.elements);
  const selectedPosition = _.findIndex(flattened, item => props.selectedId.get() === getId(item));
  return (
    <PageWithOverlay
      foregroundContent={
        selectedPosition > -1 ? (
          <Carousel
            size={flattened.length}
            selectedPostion={selectedPosition || 0}
            close={() => props.selectedId.set(null)}
            goTo={pos => props.selectedId.set(getId(flattened[pos]))}
          >
            {pos => (<Large item={flattened[pos]} />)}
          </Carousel>
        ) : null
      }
    >
      <PageWithSideMenu
        menu={
          <div style={{
            width: "220px",
            borderRight: "1px dotted black",
            height: "100%"
          }}>
            <Toolbar allTags={getTagMap(_.flatMap(props.portfolio.items, (it: Item) => it.tags))} {...props} />
          </div>
        }
        menuTitle="About"
        contentTitle="Projects"
        {...props}
      >
        <FullSize
          style={{
            flexDirection: "column",
            flex: "1 1 auto",
            overflowY: "auto"
          }}
        >
          <GroupedList
            items={grouped}
            renderItem={({ item }: { item: Item }) => (
              <Small
                style={{
                  backgroundColor: typeToSpecMapping[item.type].color
                }}
                item={item}
                onClick={() => props.selectedId.set(getId(item))}
              />
            )}
          />
        </FullSize>
      </PageWithSideMenu>
    </PageWithOverlay>
  );
};

export default Main;