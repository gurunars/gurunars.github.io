import { Set } from "immutable";
import * as _ from "lodash";
import * as React from "react";

import Box from "../Box";
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
  selectedSpecs: Box<string[] | null>;
}

const SpecFilter = (
  props: { filterMapping: TypeToSpecMapping } & SpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
      {_.map(props.filterMapping, (value, key) => {
        const specs = props.selectedSpecs.get() || [];
        const isSelected = specs.indexOf(key) > -1;
        return (
          <span
            key={key}
            style={merge(baseStyle, {
              backgroundColor: value.color,
              textDecoration: isSelected ? "line-through" : "none"
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

export interface GroupSpecSelection {
  selectedGroup: Box<string | null>;
}

const GroupBy = <T extends {}>(
  props: { groupMapping: TitleToGroupSpecMapping<T> } & GroupSpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Group by">
      {_.map(props.groupMapping, (value, key) => {
        const isSelected = (props.selectedGroup.get() || _.keys(props.groupMapping)[0]) === key;
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
  groupMapping: TitleToGroupSpecMapping<T>
} & SpecSelection & GroupSpecSelection) => (
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
    </div>
  );

export default Toolbar;