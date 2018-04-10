import { Link } from "../Link";
import { hashCode, toString } from "../utils";

export interface Duration {
  start: Date;
  end?: Date | null;
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
  toString(duration.start) + " - " + (toString(duration.end) || "NOW");

export const getId = (item: Item) => hashCode(item.location.name + ":" + item.title);