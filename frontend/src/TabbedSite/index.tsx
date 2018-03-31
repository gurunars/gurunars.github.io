import * as React from "react";
import * as _ from "lodash";

const BG_COLOR = "white";
const BORDER = "1px solid black";

export interface Page {
  alias: string;
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
  placement?: TabPlacement,
  view: React.ReactElement<any>,
  isSelected: boolean,
  onClick: () => void
}) => {
  const tabWidgetConfig = getTabWidgetConfig(props.placement);

  const style: React.CSSProperties = {
    display: "flex",
    alignItems: tabWidgetConfig.alignItems,
    justifyContent: tabWidgetConfig.justifyContent,
    marginBottom: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    cursor: "pointer"
  };

  style["margin" + tabWidgetConfig.tabBarBorderPlacement] = "-1px";
  if (!props.isSelected) {
    style["border" + tabWidgetConfig.tabBarBorderPlacement] = BORDER;
  }

  return (
    <div
      style={style}
      onClick={props.onClick}
    >
      {props.view}
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
          placement={props.tabPlacement}
          key={page.alias}
          view={page.tab}
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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: BG_COLOR,
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
          backgroundColor: BG_COLOR,
          overflowY: "auto"
        }}
      >
        {
          (_.find(
            props.pages,
            page => page.alias === props.selectedPage
          ) || { content: <div /> }).content
        }
      </div>

      {tabBarAfter}

    </div>
  );
};

export default TabbedSite;
