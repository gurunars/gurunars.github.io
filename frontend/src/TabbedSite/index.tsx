import * as React from "react";
import * as _ from "lodash";

const BG_COLOR = "white";
const TAB_BAR_HEIGHT = "35px";

interface Pages {
  [title: string]: React.ReactElement<any>;
}

const Tab = (props: {
  title: string,
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
      key={props.title}
      style={style}
      onClick={props.onClick}
    >
      {props.title}
    </span>
  );
};

const TabbedSite = (
  props: {
    pages: Pages,
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
        {_.keys(props.pages).map(title => (
          <Tab
            title={title}
            isSelected={title === props.selectedPage}
            onClick={() => props.selectedPageOnChange(title)}
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
        {props.pages[props.selectedPage]}
      </div>

    </div>
  );

export default TabbedSite;
