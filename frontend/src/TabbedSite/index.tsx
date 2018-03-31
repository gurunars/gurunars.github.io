import * as React from "react";
import * as _ from "lodash";

const BG_COLOR = "white";
const TAB_BAR_HEIGHT = "35px";

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
    border: "1px solid black",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginBottom: "-1px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "black",
    backgroundColor: BG_COLOR
  };

  const selectedStyle = {
    borderBottom: "1px solid " + BG_COLOR
  };

  const style = props.isSelected ?
    Object.assign({}, baseStyle, selectedStyle) :
    baseStyle as React.CSSProperties;

  return (
    <span
      style={style}
      onClick={props.onClick}
    >
      {props.view}
    </span>
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
        backgroundColor: BG_COLOR,
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
          backgroundColor: BG_COLOR,
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
