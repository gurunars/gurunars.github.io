import * as _ from "lodash";

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

export const extractTags = (text: string): string[] =>
  text.match(/#\{[^\}]*\}/giu) || [];

const preprocess = (initial: any): Portfolio => {
  const getLink = (alias: string) =>
    _.find(initial.links, link => link.alias === alias);

  return {
    links: initial.links,
    items: _.map(initial.items, item => ({
      duration: {
        start: new Date(item.startDate),
        end: item.endDate == null ? new Date() : new Date(item.endDate)
      },
      title: item.title,
      logo: item.logo,
      achievements: item.achievements || [],
      type: item.type,
      tags: _.uniq(
        _.flatMap(item.achievements.concat(item.description), extractTags)
      ).concat([ALL]),
      description: item.description,
      location: getLink(item.location),
      references: _.map(item.references, getLink),
      links: _.map(item.links, getLink)
    }))
  };
};

export default preprocess;
