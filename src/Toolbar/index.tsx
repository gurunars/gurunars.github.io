import { Set } from "immutable";
import _ from "lodash";
import React from "react";

import Box from "../Box";
import Tag from "../Item/Tag";
import { merge } from "../utils";

export interface Spec {
  humanReadableName: string;
  color: string;
}

export interface TypeToSpecMapping {
  [key: string]: Spec;
}

export interface GroupSpec<T extends {}> {
  humanReadableName: string;
  groupBy: (item: T) => Object;
  sortBy: (item: T) => Object;
  reverse: boolean;
}

export interface TitleToGroupSpecMapping<T extends {}> {
  [key: string]: GroupSpec<T>;
}

const baseStyle = {
  cursor: "pointer",
  color: "Black",
  marginBottom: 5,
  borderRadius: 5,
  textAlign: "center",
  paddingTop: 5,
  paddingBottom: 5
};

const NamedGroup = (props: {
  title: string;
  children: JSX.Element;
}): React.ReactElement<any> => (
  <div
    style={{
      flexDirection: "column",
      display: "flex",
      padding: 8
    }}
  >
    <b
      style={{
        marginBottom: 8,
        whiteSpace: "nowrap"
      }}
    >
      {props.title}:
    </b>
    {props.children}
  </div>
);

export interface SpecSelection {
  selectedSpecs: Box<string[]>;
}

const ACTION_STYLE = {
  color: "blue",
  cursor: "pointer",
  fontSize: 12,
  paddingTop: 10
};

const SpecFilter = (
  props: { filterMapping: TypeToSpecMapping } & SpecSelection
): React.ReactElement<any> => (
  <NamedGroup title="Data types">
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        display: "flex"
      }}
    >
      {_.map(props.filterMapping, (value, key) => {
        const specs = props.selectedSpecs.get();
        const isSelected = specs.indexOf(key) > -1;
        return (
          <span
            key={key}
            style={merge(baseStyle, {
              backgroundColor: value.color,
              textDecoration: isSelected ? "none" : "line-through"
            })}
            onClick={() =>
              props.selectedSpecs.set(
                isSelected
                  ? Set(specs)
                      .remove(key)
                      .toArray()
                  : Set(specs)
                      .add(key)
                      .toArray()
              )
            }
          >
            {value.humanReadableName}
          </span>
        );
      })}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <span onClick={() => props.selectedSpecs.set([])} style={ACTION_STYLE}>
          Hide All
        </span>

        <span
          onClick={() => props.selectedSpecs.set(_.keys(props.filterMapping))}
          style={ACTION_STYLE}
        >
          Show All
        </span>
      </div>
    </div>
  </NamedGroup>
);

export interface TagSelection {
  selectedTag: Box<string>;
}

export interface TagSpec {
  [key: string]: number;
}

const TagFilter = (
  props: { allTags: TagSpec } & TagSelection
): React.ReactElement<any> => (
  <NamedGroup title="Skills">
    <div>
      {_.map(props.allTags, (count, title) => {
        const isSelected = props.selectedTag.get() === title;
        return (
          <Tag
            key={title}
            style={{
              marginBottom: "5px",
              cursor: "pointer",
              backgroundColor: isSelected ? "#1B2E3C" : "Beige",
              color: isSelected ? "white" : "black"
            }}
            onClick={() => props.selectedTag.set(title)}
          >
            {"" + title + " (" + count + ")"}
          </Tag>
        );
      })}
    </div>
  </NamedGroup>
);

export interface GroupSpecSelection {
  selectedGroup: Box<string>;
}

const Sep = () => (
  <div
    style={{
      width: "100%",
      backgroundColor: "black",
      height: 1
    }}
  />
);

const GroupBy = <T extends {}>(
  props: { groupMapping: TitleToGroupSpecMapping<T> } & GroupSpecSelection
): React.ReactElement<any> => (
  <NamedGroup title="Group by">
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        display: "flex"
      }}
    >
      {_.map(props.groupMapping, (value, key) => {
        const isSelected = props.selectedGroup.get() === key;
        return (
          <span
            key={key}
            style={merge(baseStyle, {
              backgroundColor: isSelected ? "#1B2E3C" : "Beige",
              marginBottom: 5,
              color: isSelected ? "white" : "black"
            })}
            onClick={() => props.selectedGroup.set(key)}
          >
            {value.humanReadableName}
          </span>
        );
      })}
    </div>
  </NamedGroup>
);

const Toolbar = <T extends {}>(
  props: {
    children?: React.ReactElement<any>;
    filterMapping: TypeToSpecMapping;
    groupMapping: TitleToGroupSpecMapping<T>;
    allTags: TagSpec;
  } & SpecSelection &
    GroupSpecSelection &
    TagSelection
) => (
  <div
    style={{
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%"
    }}
  >
    <GroupBy {...props} />
    <Sep />
    <SpecFilter {...props} />
    <Sep />
    <TagFilter {...props} />
  </div>
);

export default Toolbar;
