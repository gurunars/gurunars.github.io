import { Set } from "immutable";
import * as _ from "lodash";
import * as React from "react";

import About, { Meta } from "../About";
import Box from "../Box";
import Tag from "../Item/Tag";
import { merge } from "../utils";

export interface Spec {
  humanReadableName: string;
  color: string;
}

export interface TypeToSpecMapping { [key: string]: Spec; }

export interface GroupSpec<T extends {}> {
  humanReadableName: string;
  groupBy: (item: T) => Object;
  sortBy: (item: T) => Object;
  reverse: boolean;
}

export interface TitleToGroupSpecMapping<T extends {}> { [key: string]: GroupSpec<T>; }

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
    <div style={{
      flexDirection: "column",
      display: "flex",
      margin: 8
    }}>
      <b
        style={{
          marginBottom: 8,
          whiteSpace: "nowrap"
        }}
      >{props.title}:
    </b>
      {props.children}
    </div>
  );

export interface SpecSelection {
  selectedSpecs: Box<string[]>;
}

const SpecFilter = (
  props: { filterMapping: TypeToSpecMapping } & SpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
      <div style={{
        width: "100%",
        flexDirection: "column",
        display: "flex"
      }}>
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
              onClick={() => props.selectedSpecs.set(
                isSelected ?
                  Set(specs).remove(key).toArray() :
                  Set(specs).add(key).toArray()
              )}
            >
              {value.humanReadableName}
            </span>
          );
        })}
      </div>
    </NamedGroup>
  );

export interface TagSelection {
  selectedTag: Box<string>;
}

export interface TagSpec { [key: string]: number; }

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

const GroupBy = <T extends {}>(
  props: { groupMapping: TitleToGroupSpecMapping<T> } & GroupSpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Group by">
      <div style={{
        width: "100%",
        flexDirection: "column",
        display: "flex"
      }}>
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

const Toolbar = <T extends {}>(props: {
  meta: Meta,
  filterMapping: TypeToSpecMapping,
  groupMapping: TitleToGroupSpecMapping<T>,
  allTags: TagSpec
} & SpecSelection & GroupSpecSelection & TagSelection) => (
    <div
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <About {...props} />
      <hr />
      <SpecFilter {...props} />
      <hr />
      <GroupBy {...props} />
      <hr />
      <TagFilter {...props} />
    </div>
  );

export default Toolbar;