import * as React from "react";
import * as _ from "lodash";

const BG_COLOR = "white";
const BORDER = "1px solid black";

export interface Page {
  alias: string;
  withBorder?: boolean;
  color?: string;
  tab: React.ReactElement<any>;
  content: React.ReactElement<any>;
}

export type TabPlacement = "top" | "bottom" | "left" | "right";

export interface PageCollection {
  pages: Page[];
  tabPlacement?: TabPlacement;
}

export interface PageSelector {
  selectedPage: string;
  selectedPageOnChange: (selectedPage: string) => void;
}

type TabWidgetConfig = {
  tabBarBorderPlacement: string;
  isHorizontal: boolean;
  isAfter: boolean;
  alignItems: "center" | "flex-start" | "flex-end";
  justifyContent: "center" | "flex-start" | "flex-end";
};

const getTabWidgetConfig = (placement?: TabPlacement): TabWidgetConfig => {
  switch (placement) {
    case "right":
      return {
        tabBarBorderPlacement: "Left",
        isHorizontal: true,
        isAfter: true,
        justifyContent: "flex-start",
        alignItems: "center"
      };
    case "bottom":
      return {
        tabBarBorderPlacement: "Top",
        isHorizontal: false,
        isAfter: true,
        justifyContent: "center",
        alignItems: "flex-start"
      };
    case "left":
      return {
        tabBarBorderPlacement: "Right",
        isHorizontal: true,
        isAfter: false,
        justifyContent: "flex-end",
        alignItems: "center"
      };
    case "top":
    default:
      return {
        tabBarBorderPlacement: "Bottom",
        isHorizontal: false,
        isAfter: false,
        justifyContent: "center",
        alignItems: "flex-end"
      };
  }
};

const Tab = (props: {
  page: Page,
  placement?: TabPlacement,
  isSelected: boolean,
  onClick: () => void
}) => {
  const tabWidgetConfig = getTabWidgetConfig(props.placement);

  const style: React.CSSProperties = {
    display: "flex",
    alignItems: tabWidgetConfig.alignItems,
    justifyContent: tabWidgetConfig.justifyContent,
    backgroundColor: props.page.color,
    cursor: "pointer"
  };

  const coloredBorder = "1px solid " + props.page.color;

  ["Bottom", "Left", "Top", "Right"].forEach(pos => {
    style["margin" + pos] = "5px";
    style["border" + pos] = props.page.withBorder ? BORDER : coloredBorder;
  });

  style["margin" + tabWidgetConfig.tabBarBorderPlacement] = "-1px";
  style["border" + tabWidgetConfig.tabBarBorderPlacement] = props.isSelected ? coloredBorder : BORDER;

  return (
    <div
      style={style}
      onClick={props.onClick}
    >
      {props.page.tab}
    </div>
  );
};

const TabbedSite = (props: PageCollection & PageSelector) => {

  const tabWidgetConfig = getTabWidgetConfig(props.tabPlacement);

  const baseStyle: React.CSSProperties = {
    display: "flex",
    flexFlow: tabWidgetConfig.isHorizontal ? "column" : "row",
    flex: "0 1 auto"
  };

  baseStyle["border" + tabWidgetConfig.tabBarBorderPlacement] = BORDER;

  if (tabWidgetConfig.isHorizontal) {
    baseStyle.height = "100%";
  } else {
    baseStyle.width = "100%";
  }

  const tabBar = (
    <div style={baseStyle}>
      {props.pages.map(page => (
        <Tab
          page={page}
          placement={props.tabPlacement}
          isSelected={page.alias === props.selectedPage}
          onClick={() => props.selectedPageOnChange(page.alias)}
        />
      ))}
    </div>
  );

  let tabBarBefore;
  let tabBarAfter;

  if (tabWidgetConfig.isAfter) {
    tabBarAfter = tabBar;
  } else {
    tabBarBefore = tabBar;
  }

  const selected = _.find(
    props.pages,
    page => page.alias === props.selectedPage
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflowY: "hidden",
        display: "flex",
        flexFlow: tabWidgetConfig.isHorizontal ? "row" : "column"
      }}
    >

      {tabBarBefore}

      <div
        style={{
          position: "relative",
          flex: "1 1 auto",
          height: "100%",
          width: "100%",
          backgroundColor: selected ? selected.color : BG_COLOR,
          overflowY: "auto"
        }}
      >
        {(selected || { content: <div /> }).content}
      </div>

      {tabBarAfter}

    </div>
  );
};

export default TabbedSite;
