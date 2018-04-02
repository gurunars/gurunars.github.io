import * as React from "react";
import * as _ from "lodash";

import { TypeToSpecMapping, Spec } from "../interface";

const SpecView = ({spec, isSelected, isSelectedOnChange}: {
  spec: Spec,
  isSelected: boolean,
  isSelectedOnChange: (isSelected: boolean) => void
}) => (
  <span 
    style={{
      cursor: "pointer",
      color: "Black",
      marginLift: 10,
      marginRight: 10,
      borderRadius: 5,
      textAlign: "center",
      padding: 5,
      backgroundColor: spec.color,
      textDecoration: !isSelected ? "line-through" : "none"
    }} 
    onClick={() => isSelectedOnChange(!isSelected)}
  >
    {spec.humanReadableName}
  </span>
);

const SpecFilter = (props: {
  selectedSpecs: string[]
  selectedSpecsOnChange: (selectedSpecs: string[]) => void
}): React.ReactElement<any> => (
  <div>
    <b style={{marginRight: 10, whiteSpace: "nowrap"}}>Project types: </b>
    {_.map(TypeToSpecMapping, (value, key) =>
      <SpecView spec={value} />
    })}
  </div>
);

const Toolbar = (props: {
  title: string,
  onClick: () => void
}): React.ReactElement<any> => (
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );

export default Toolbar;
