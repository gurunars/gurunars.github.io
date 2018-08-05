import { Set } from "immutable";
import * as _ from "lodash";
import * as React from "react";

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
  marginLift: 10,
  marginRight: 10,
  marginBottom: 5,
  borderRadius: 5,
  textAlign: "center",
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  paddingBottom: 5
};

interface Props {
  title: string;
  children: JSX.Element[];
}

const NamedGroup = (props: Props): React.ReactElement<any> => (
  <div style={{
    flexDirection: "column",
    display: "flex"
  }}>
    <b
      style={{
        marginRight: 10,
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
    </NamedGroup>
  );

export interface TagSelection {
  selectedTags: Box<string[]>;
}

export interface TagSpec { [key: string]: number; }

const TagFilter = (
  props: { allTags: TagSpec } & TagSelection
): React.ReactElement<any> => (
    <NamedGroup title="Skill tags">
      {_.map(props.allTags, (count, title) => {
        // const selected = props.selectedTags.get();
        // const isSelected = selected.indexOf(tag) > -1;
        return (
          <Tag key={title} value={"" + title + " (" + count + ")"} />
        );
      })}
    </NamedGroup>
  );

export interface GroupSpecSelection {
  selectedGroup: Box<string>;
}

const GroupBy = <T extends {}>(
  props: { groupMapping: TitleToGroupSpecMapping<T> } & GroupSpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Group by">
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
    </NamedGroup>
  );

const Toolbar = <T extends {}>(props: {
  filterMapping: TypeToSpecMapping,
  groupMapping: TitleToGroupSpecMapping<T>,
  allTags: TagSpec
} & SpecSelection & GroupSpecSelection & TagSelection) => (
    <div
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        padding: 5
      }}
    >
      <SpecFilter {...props} />
      <GroupBy {...props} />
      <TagFilter {...props} />
    </div>
  );

export default Toolbar;