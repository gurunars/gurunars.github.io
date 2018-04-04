import * as React from "react";
import * as _ from "lodash";
import { Set } from "immutable";

import { merge } from "../../utils";
import responsive from "../../Responsive";

import { TypeToSpecMapping, TitleToGroupSpecMapping } from "../interfaces";

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

interface SpecSelection {
  selectedSpecs: string[];
  selectedSpecsOnChange: (selectedSpecs: string[]) => void;
}

export const SpecFilter = (
  props: { mapping: TypeToSpecMapping } & Alignment & SpecSelection
): React.ReactElement<any> => (
    <NamedGroup title="Project types">
      {_.map(props.mapping, (value, key) => {
        const isSelected = props.selectedSpecs.indexOf(key) > -1;
        return (
          <span
            style={merge(baseStyle, {
              backgroundColor: value.color,
              textDecoration: isSelected ? "line-through" : "none"
            })}
            onClick={() => props.selectedSpecsOnChange(
              isSelected ?
                Set(props.selectedSpecs).add(key).toArray() :
                Set(props.selectedSpecs).remove(key).toArray()
            )}
          >
            {value.humanReadableName}
          </span>
        );
      })}
    </NamedGroup>
  );

interface GroupSpecSelection {
  selectedGroup?: string | null;
  selectedGroupOnChange: (selectedSpecs: string) => void;
}

export const GroupBy = (
  props: { mapping: TitleToGroupSpecMapping } & Alignment & GroupSpecSelection
): React.ReactElement<any> => (
  <NamedGroup title="Project types">
    {_.map(props.mapping, (value, key) => {
      const isSelected = (props.selectedGroup || _.keys(props.mapping)[0]) === key;
      return (
        <span
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
