import { Link } from "../Link";
import { hashCode } from "../utils";

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

export const getId = (item: Item) => hashCode(item.location + ":" + item.title);