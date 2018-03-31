import * as React from "react";
import * as _ from "lodash";

const BG_COLOR = "white";
const BORDER = "1px solid black";

export interface Page {
  alias: string;
  tab: React.ReactElement<any>;
  content: React.ReactElement<any>;
}

export interface PageCollection {
  pages: Page[];
}

export interface PageSelector {
  selectedPage: string;
  selectedPageOnChange: (selectedPage: string) => void;
}

const Tab = (props: {
  view: React.ReactElement<any>,
  isSelected: boolean,
  onClick: () => void
}) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "-1px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    cursor: "pointer"
  };

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

const TabbedSite = (props: PageCollection & PageSelector) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundColor: BG_COLOR,
      overflowY: "hidden",
      display: "flex",
      flexFlow: "column"
    }}
  >
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        flex: "0 1 auto",
        width: "100%",
        borderBottom: BORDER
      }}
    >
      {props.pages.map(page => (
        <Tab
          key={page.alias}
          view={page.tab}
          isSelected={page.alias === props.selectedPage}
          onClick={() => props.selectedPageOnChange(page.alias)}
        />
      ))}
    </div>

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

  </div>
);

export default TabbedSite;
