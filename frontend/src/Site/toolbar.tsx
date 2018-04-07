import * as React from "react";
import { Spec, GroupSpec, SpecFilter, GroupBy, SpecSelection, GroupSpecSelection } from "../Toolbar";
import { ResponsiveFlex } from "../Layouts";

export const TypeToSpecMapping: { [key: string]: Spec } = {
  openSource: {
    humanReadableName: "Open Source",
    color: "PaleGreen"
  },
  freelance: {
    humanReadableName: "Freelance",
    color: "MistyRose"
  },
  fullTimeJob: {
    humanReadableName: "Full time job",
    color: "Lavender"
  },
  education: {
    humanReadableName: "Education",
    color: "Silver"
  }
};

export const getTypeSpec = (type: string): Spec => TypeToSpecMapping[type] || {
  humanReadableName: "Unknown",
  color: "white"
};

export const Groups: { [key: string]: GroupSpec } = {
  "year": {
    humanReadableName: "year",
    groupBy: "year",
    sortBy: "timestamp",
    reverse: true
  },
  "type": {
    humanReadableName: "Type",
    groupBy: "humanReadableType",
    sortBy: "timestamp",
    reverse: false
  },
  "title": {
    humanReadableName: "Title",
    groupBy: "titleFirstChar",
    sortBy: "title",
    reverse: false
  },
  "location": {
    humanReadableName: "Location",
    groupBy: "locationName",
    sortBy: "timestamp",
    reverse: false
  }
};

const Toolbar = (props: { isVertical: boolean } & SpecSelection & GroupSpecSelection) => (
  <ResponsiveFlex>
    <SpecFilter mapping={TypeToSpecMapping} {...props} />
    <GroupBy mapping={Groups} {...props} />
  </ResponsiveFlex>
);

export default Toolbar;