import * as _ from "lodash";
import { titleCase } from "voca";

import { Item } from "./Item";
import { Link } from "./Link";
import { TagSpec } from "./Toolbar";

export interface Portfolio {
  links: Link[];
  items: Item[];
}

export const ALL = "All";

export const getImportantSkills: ((portfolio: Portfolio) => TagSpec) = _.flow([
  // we want ALL tag to be applied to each item
  initial => _.flatMap(initial.items, it => it.tags || []),
  // create a {tag: count} map
  _.countBy,
  // we are interested only in the skills that are quite frequently used
  it => _.pickBy(it, count => count > 1),
  // order by count (3 lines below)
  _.toPairs,
  it => _.sortBy(it, 1).reverse(),
  _.fromPairs
]);

const isWhitespace = (char: string) => /^\s+$/.test(char);

const formatSimpleTag = (tag: string) => tag;

export const extractTags = (
  text: string,
  formatTag: ((tag: string) => string) = formatSimpleTag
): [string, string[]] => {
  const output: string[] = [];
  const tags: string[] = [];

  type State = "IDLE" | "HASH" | "FLEX" | "IFLEX";
  let state: State = "IDLE";

  let buffer: string[] = [];

  const procBuffer = () => {
    const tag = _.join(buffer, "");
    tags.push(tag);
    output.push(formatTag(tag));
    buffer = [];
  };

  for (const c of text) {
    if (state === "HASH") {
      if (isWhitespace(c)) {
        output.push("#");
        output.push(c);
        state = "IDLE";
      } else if (c === "{") {
        state = "FLEX";
      } else {
        state = "IFLEX";
        buffer.push(c);
      }
    } else if (state === "FLEX") {
      if (c === "}") {
        state = "IDLE";
        procBuffer();
      } else {
        buffer.push(c);
      }
    } else if (state === "IFLEX") {
      if (isWhitespace(c)) {
        state = "IDLE";
        procBuffer();
        output.push(c);
      } else {
        buffer.push(c);
      }
    } else {
      // IDLE
      if (c === "#") {
        state = "HASH";
      } else {
        output.push(c);
      }
    }
  }

  if (buffer.length > 0) {
    procBuffer();
  }

  return [_.join(output, ""), tags];
};

const preprocess = (initial: any): Portfolio => {
  const getLink = (alias: string) =>
    _.find(initial.links, link => link.alias === alias);

  return {
    links: initial.links,
    items: _.map(initial.items, item => {
      const tags = [ALL];

      const desc = extractTags(item.description || "");
      for (const tag of desc[1]) {
        tags.push(tag);
      }

      const achievements = [];
      for (const achievement of item.achievements || []) {
        const ack = extractTags(achievement);
        achievements.push(ack[0]);
        for (const tag of ack[1]) {
          tags.push(tag);
        }
      }

      return {
        duration: {
          start: new Date(item.startDate),
          end: item.endDate == null ? new Date() : new Date(item.endDate)
        },
        title: item.title,
        logo: item.logo,
        type: item.type,
        tags: _.uniq(tags.map((it, i) => titleCase(it))),
        description: desc[0],
        location: getLink(item.location),
        references: _.map(item.references, getLink),
        links: _.map(item.links, getLink),
        achievements
      };
    })
  };
};

export default preprocess;
