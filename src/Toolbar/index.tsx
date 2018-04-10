import * as React from "react";
import * as _ from "lodash";
import { Set } from "immutable";

import { merge } from "../utils";
import { ResponsiveFlex } from "../Layouts";

export interface Spec {
  humanReadableName: string;
  color: string;
}

export type TypeToSpecMapping = { [key: string]: Spec };

export interface GroupSpec<T extends {}> {
  humanReadableName: string;
  groupBy: (item: T) => Object;
  sortBy: (item: T) => Object;
  reverse: boolean;
}

export type TitleToGroupSpecMapping<T extends {}> = { [key: string]: GroupSpec<T> };

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

type Props = {
  title: string,
  children: JSX.Element[]
};

const NamedGroup = (props: Props): React.ReactElement<any> => (
  <ResponsiveFlex>
    <b
      style={{
        marginRight: 10,
        marginBottom: 8,
        whiteSpace: "nowrap"
      }}
    >{props.title}:
    </b>
    {props.children}
  </ResponsiveFlex>
);

export interface SpecSelection {
  selectedSpecs: string[] | null;
  selectedSpecsOnChange: (selectedSpecs: string[]) => void;
}

const SpecFilter = (
  props: { filterMapping: TypeToSpecMapping } & SpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
      {_.map(props.filterMapping, (value, key) => {
        const specs = props.selectedSpecs || [];
        const isSelected = specs.indexOf(key) > -1;
        return (
          <span
            key={key}
            style={merge(baseStyle, {
              backgroundColor: value.color,
              textDecoration: isSelected ? "line-through" : "none"
            })}
            onClick={() => props.selectedSpecsOnChange(
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
  selectedGroup: string | null;
  selectedGroupOnChange: (selectedSpecs: string) => void;
}

const GroupBy = <T extends {}>(
  props: { groupMapping: TitleToGroupSpecMapping<T> } & GroupSpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
      {_.map(props.groupMapping, (value, key) => {
        const isSelected = (props.selectedGroup || _.keys(props.groupMapping)[0]) === key;
        return (
          <span
            key={key}
            style={merge(baseStyle, {
              backgroundColor: isSelected ? "#1B2E3C" : "Beige",
              marginBottom: 5,
              color: isSelected ? "white" : "black"
            })}
            onClick={() => props.selectedGroupOnChange(key)}
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
    <ResponsiveFlex
      tabletAsMobile={true}
      style={{
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <SpecFilter {...props} />
      <GroupBy {...props} />
    </ResponsiveFlex>
  );

export default Toolbar;