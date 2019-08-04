import _ from "lodash";
import React from "react";
import { getId, Item, Large, Small } from "../Item";
import BaseToolbar, {
  GroupSpecSelection,
  SpecSelection,
  TagSelection,
  TagSpec,
  TitleToGroupSpecMapping,
  TypeToSpecMapping
} from "../Toolbar";

import Carousel from "../Carousel";
import GroupedList from "../GroupedList";
import { groupItems } from "../GroupedList/grouping";
import PageWithOverlay from "../PageWithOverlay";

import Box from "../Box";
import { FullSize } from "../Layouts";
import { getImportantSkills, Portfolio } from "../model";
import PageWithSideMenu, { MenuVisibility } from "../PageWithSideMenu";
import responsive from "../Responsive";
import { yearToString } from "../utils";

export const typeToSpecMapping: TypeToSpecMapping = {
  contactCard: {
    // NOTE: contact card is first anyways - we are all good
    humanReadableName: "@ Contact Card",
    color: "PaleTurquoise"
  },
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
  publication: {
    humanReadableName: "Publication",
    color: "Gainsboro"
  },
  education: {
    humanReadableName: "Education",
    color: "Thistle"
  },
  certificate: {
    humanReadableName: "Certificate",
    color: "Khaki"
  }
};

export const groups: TitleToGroupSpecMapping<Item> = {
  type: {
    humanReadableName: "Type",
    groupBy: (item: Item) => typeToSpecMapping[item.type].humanReadableName,
    sortBy: (item: Item) => -item.duration.start.getTime(),
    reverse: false
  },
  endYear: {
    humanReadableName: "End Year",
    groupBy: (item: Item) => yearToString(item.duration.end),
    sortBy: (item: Item) => item.duration.end,
    reverse: true
  },
  startYear: {
    humanReadableName: "Start Year",
    groupBy: (item: Item) => yearToString(item.duration.start),
    sortBy: (item: Item) => item.duration.start,
    reverse: true
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

const filterByTag = (items: Item[], tag: string): Item[] =>
  _.filter(items, (item: Item) => item.tags.indexOf(tag) > -1);

const Toolbar = (
  props: { allTags: TagSpec } & SpecSelection &
    GroupSpecSelection &
    TagSelection
) => (
  <BaseToolbar
    groupMapping={groups}
    filterMapping={typeToSpecMapping}
    {...props}
  />
);

interface IdHodler {
  selectedId: Box<number | null>;
}

const DesktopToolbarWrapper = ({
  children
}: {
  children: React.ReactChild;
}) => (
  <div
    style={{
      width: "270px",
      overflowY: "auto",
      borderRight: "1px solid black",
      height: "100%"
    }}
  >
    {children}
  </div>
);

const MobileToolbarWrapper = ({ children }: { children: React.ReactChild }) => (
  <div
    style={{
      backgroundColor: "white",
      overflowY: "auto",
      width: "100%",
      height: "100%"
    }}
  >
    {children}
  </div>
);

const ToolbarWrapper = responsive({
  desktopView: DesktopToolbarWrapper,
  mobileView: MobileToolbarWrapper
});

const Main = (
  props: {
    children?: JSX.Element;
    portfolio: Portfolio;
  } & IdHodler &
    SpecSelection &
    GroupSpecSelection &
    MenuVisibility &
    TagSelection
) => {
  const group = groups[props.selectedGroup.get()];

  const filtered = filterByTag(
    filterItems(props.portfolio.items, props.selectedSpecs.get()),
    props.selectedTag.get()
  );

  const grouped = groupItems(
    filtered,
    group.groupBy,
    group.sortBy,
    group.reverse
  );
  const flattened = _.flatMap(grouped, grp => grp.elements);
  const selectedPosition = _.findIndex(
    flattened,
    item => props.selectedId.get() === getId(item)
  );
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
            {pos => <Large item={flattened[pos]} />}
          </Carousel>
        ) : null
      }
    >
      <PageWithSideMenu
        menu={
          <ToolbarWrapper>
            <Toolbar allTags={getImportantSkills(props.portfolio)} {...props} />
          </ToolbarWrapper>
        }
        menuTitle="Menu"
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
