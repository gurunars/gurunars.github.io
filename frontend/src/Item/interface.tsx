import { Link } from "../Link";
import { Spec, GroupSpec } from "../GroupedList/interfaces";

export interface Duration {
  start: Date;
  end?: Date;
}

export interface Item {
  title: string;
  achievements: string[];
  location: Link;
  references: Link[];
  type: string;
  tags: string[];
  description: string;
  links: Link[];
  duration: Duration;
}

const format = (date?: Date | null) =>
  date == null ? null :
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();

export const durationToString = (duration: Duration) =>
  format(duration.start) + " - " + (format(duration.end) || "NOW");

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
