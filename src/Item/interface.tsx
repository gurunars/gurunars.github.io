import { Link } from "../Link";
import { dayToString, hashCode } from "../utils";

export interface Duration {
  start: Date;
  end: Date;
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

export const durationToString = (duration: Duration) =>
  dayToString(duration.start) + " - " + dayToString(duration.end);

export const getId = (item: Item) =>
  hashCode(item.location.name + ":" + item.title);
