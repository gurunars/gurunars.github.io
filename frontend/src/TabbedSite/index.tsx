import * as React from "react";
import * as _ from "lodash";

const TAB_BAR_HEIGHT = "35px";
const BORDER = "1px solid black";

interface Page {
  alias: string;
  tab: React.ReactElement<any>;
  content: React.ReactElement<any>;
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
    borderTop: BORDER,
    borderLeft: BORDER,
    borderRight: BORDER,
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

const TabbedSite = (
  props: {
    pages: Page[],
    selectedPage: string,
    selectedPageOnChange: (selectedPage: string) => void
  }) => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflowY: "hidden"
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: TAB_BAR_HEIGHT,
          borderBottom: "1px solid black"
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
          height: "calc(100% - " + TAB_BAR_HEIGHT + ")",
          width: "100%",
          display: "flex",
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
