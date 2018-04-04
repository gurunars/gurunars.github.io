import * as React from "react";
import * as _ from "lodash";
import { Set } from "immutable";

import { merge } from "../../utils";
import responsive from "../../Responsive";

import { TypeToSpecMapping, Spec, TitleToGroupSpecMapping, GroupSpec } from "../interfaces";

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

interface Alignment {
  isVertical?: boolean;
}

type Props = {
  title: string, 
  children: JSX.Element[]
};

const PartialNamedGroup = (
  isVertical: boolean, 
  props: Props
): React.ReactElement<any> => (
  <div 
    style={{
      alignItems: isVertical ? "initial" : "center",
      display: "flex",
      flexDirection: isVertical ? "column" : "row"
    }}
  >
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

const NamedGroup: (props: Props) => React.ReactElement<any> = responsive({
  desktopView: PartialNamedGroup.bind(null, false),
  mobileView: PartialNamedGroup.bind(null, true)
});

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
  props: { mapping: TypeToSpecMapping } & Alignment & SpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
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
    </NamedGroup>
  );

const GroupView = ({ spec, isSelected, isSelectedOnChange }: {
  spec: GroupSpec,
  isSelected: boolean,
  isSelectedOnChange: (isSelected: boolean) => void
}) => (
    <span
      style={merge(baseStyle, {
        backgroundColor: isSelected ? "#1B2E3C" : "Beige",
        marginBottom: 5,
        color: isSelected ? "white" : "black"
      })}
      onClick={() => isSelectedOnChange(!isSelected)}
    >
      {spec.humanReadableName}
    </span>
  );

interface GroupSpecSelection {
  selectedGroup?: string | null;
  selectedGroupOnChange: (selectedSpecs: string) => void;
}

export const GroupBy = (
  props: { mapping: TitleToGroupSpecMapping } & Alignment & GroupSpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Group by">
      {_.map(props.mapping, (value, key) =>
        <GroupView
          spec={value}
          isSelected={(props.selectedGroup || _.keys(props.mapping)[0]) === key}
          isSelectedOnChange={isSelected => props.selectedGroupOnChange(key)}
        />
      )}
    </NamedGroup>
  );
