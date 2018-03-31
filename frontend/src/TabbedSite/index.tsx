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

const getTabBarBorderPosition = (placement?: TabPlacement): string => {
  switch (placement) {
    case "right":
      return "Left";
    case "bottom":
      return "Top";
    case "left":
      return "Right";
    case "top":
    default:
      return "Bottom";
  }
};

const Tab = (props: {
  placement?: TabPlacement,
  view: React.ReactElement<any>,
  isSelected: boolean,
  onClick: () => void
}) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    cursor: "pointer"
  };

  const negativeMarginSide = getTabBarBorderPosition(props.placement);

  baseStyle["margin" + negativeMarginSide] = "-1px";

  const unselectedStyle = {
    borderBottom: BORDER
  };

  const style = props.isSelected ?
    baseStyle as React.CSSProperties :
    Object.assign({}, baseStyle, unselectedStyle);

  return (
    <div
      style={style}
      onClick={props.onClick}
    >
      {props.view}
    </div>
  );
};

const isHorizontal = (placement?: TabPlacement): boolean => {
  switch (placement) {
    case "right":
    case "left":
      return true;
    case "bottom":
    case "top":
    default:
      return false;
  }
};

const isAfter = (placement?: TabPlacement): boolean => {
  switch (placement) {
    case "top":
    case "left":
      return false;
    case "right":
    case "bottom":
    default:
      return true;
  }
};

const TabbedSite = (props: PageCollection & PageSelector) => {

  const borderPlacement = getTabBarBorderPosition(props.tabPlacement);

  const baseStyle: React.CSSProperties = {
    display: "flex",
    flexFlow: isHorizontal(props.tabPlacement) ? "column" : "row",
    flex: "0 1 auto"
  };

  baseStyle["border" + borderPlacement] = BORDER;

  if (isHorizontal(props.tabPlacement)) {
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

  if (isAfter(props.tabPlacement)) {
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
        flexFlow: isHorizontal(props.tabPlacement) ? "row" : "column"
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
