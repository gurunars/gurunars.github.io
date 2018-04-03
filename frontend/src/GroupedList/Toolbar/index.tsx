import * as React from "react";
import * as _ from "lodash";
import { Set } from "immutable";

import { merge } from "../../utils";

import { TypeToSpecMapping, Spec, TitleToGroupSpecMapping, GroupSpec } from "../interfaces";

const baseStyle = {
  cursor: "pointer",
  color: "Black",
  marginLift: 10,
  marginRight: 10,
  borderRadius: 5,
  textAlign: "center",
  padding: 5
};

const SpecView = ({ spec, isSelected, isSelectedOnChange }: {
  spec: Spec,
  isSelected: boolean,
  isSelectedOnChange: (isSelected: boolean) => void
}) => (
    <span
      style={merge(baseStyle, {
        backgroundColor: spec.color,
        textDecoration: isSelected ? "line-through" : "none"
      })}
      onClick={() => isSelectedOnChange(!isSelected)}
    >
      {spec.humanReadableName}
    </span>
  );

interface SpecSelection {
  selectedSpecs: string[];
  selectedSpecsOnChange: (selectedSpecs: string[]) => void;
}

export const SpecFilter = (
  props: { mapping: TypeToSpecMapping } & SpecSelection
): React.ReactElement<any> => (
    <div>
      <b style={{ marginRight: 10, whiteSpace: "nowrap" }}>Project types: </b>
      {_.map(props.mapping, (value, key) =>
        <SpecView
          spec={value}
          isSelected={props.selectedSpecs.indexOf(key) > -1}
          isSelectedOnChange={isSelected =>
            props.selectedSpecsOnChange(
              isSelected ?
                Set(props.selectedSpecs).add(key).toArray() :
                Set(props.selectedSpecs).remove(key).toArray()
            )
          }
        />
      )}
    </div>
  );

const GroupView = ({ title, spec, isSelected, isSelectedOnChange }: {
  title: string,
  spec: GroupSpec,
  isSelected: boolean,
  isSelectedOnChange: (isSelected: boolean) => void
}) => (
    <span
      style={merge(baseStyle, {
        backgroundColor: isSelected ? "#1B2E3C" : "Beige",
        color: isSelected ? "white" : "black"
      })}
      onClick={() => isSelectedOnChange(!isSelected)}
    >
      {title}
    </span>
  );

interface GroupSpecSelection {
  selectedGroup: string;
  selectedGroupOnChange: (selectedSpecs: string) => void;
}

export const GroupBy = (
  props: { mapping: TitleToGroupSpecMapping } & GroupSpecSelection
): React.ReactElement<any> => (
    <div>
      <b style={{ marginRight: 10, whiteSpace: "nowrap" }}>Project types: </b>
      {_.map(props.mapping, (value, key) =>
        <GroupView
          title={key}
          spec={value}
          isSelected={props.selectedGroup === value.alias}
          isSelectedOnChange={isSelected => props.selectedGroupOnChange(value.alias)}
        />
      )}
    </div>
  );