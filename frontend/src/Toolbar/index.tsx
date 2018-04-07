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

export interface GroupSpec {
  humanReadableName: string;
  groupBy: string;
  sortBy: string;
  reverse: boolean;
}

export type TitleToGroupSpecMapping = { [key: string]: GroupSpec };

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
  selectedSpecs: string[];
  selectedSpecsOnChange: (selectedSpecs: string[]) => void;
}

export const SpecFilter = (
  props: { mapping: TypeToSpecMapping } & SpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
      {_.map(props.mapping, (value, key) => {
        const isSelected = props.selectedSpecs.indexOf(key) > -1;
        return (
          <span
            key={key}
            style={merge(baseStyle, {
              backgroundColor: value.color,
              textDecoration: isSelected ? "line-through" : "none"
            })}
            onClick={() => props.selectedSpecsOnChange(
              isSelected ?
                Set(props.selectedSpecs).remove(key).toArray() :
                Set(props.selectedSpecs).add(key).toArray()
            )}
          >
            {value.humanReadableName}
          </span>
        );
      })}
    </NamedGroup>
  );

export interface GroupSpecSelection {
  selectedGroup?: string | null;
  selectedGroupOnChange: (selectedSpecs: string) => void;
}

export const GroupBy = (
  props: {
    mapping: TitleToGroupSpecMapping
  } & GroupSpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
      {_.map(props.mapping, (value, key) => {
        const isSelected = (props.selectedGroup || _.keys(props.mapping)[0]) === key;
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
