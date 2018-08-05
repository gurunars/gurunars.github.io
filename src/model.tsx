import * as _ from "lodash";

import { Meta } from "./About";
import { Item } from "./Item";
import { TagSpec } from "./Toolbar";

export interface Portfolio {
    meta: Meta;
    items: Item[];
}

export const ALL = "All";

export const getImportantSkills: ((portfolio: Portfolio) => TagSpec) = _.flow([
    initial => _.flatMap(initial.items, it => (it.tags || []).concat([ALL])),
    _.countBy,
    it => _.pickBy(it, count => count > 1),
    _.toPairs,
    it => _.sortBy(it, 1).reverse(),
    _.fromPairs
]);

const preprocess = (initial: any): Portfolio => {

    const getLink = (alias: string) =>
        _.find(initial.links, link => link.alias === alias);

    const meta = initial.meta;

    const foo = {
        meta: {
            name: meta.name,
            languages: meta.lanuages,
            specialization: meta.specialization,
            avatar: meta.avatar,
            media: _.map(meta.media, getLink),
            birthday: new Date(meta.birthday)
        },
        items: _.map(initial.items, item => ({
            duration: {
                start: new Date(item.startDate),
                end: item.endDate == null ? null : new Date(item.endDate)
            },
            title: item.title,
            achievements: item.achievements || [],
            type: item.type,
            tags: (item.tags || []).concat([ALL]),
            description: item.description,
            location: getLink(item.location),
            references: _.map(item.references, getLink),
            links: _.map(item.links, getLink)
        }))
    };

    // tslint:disable-next-line:no-console
    console.log(getImportantSkills(foo));

    return foo;
};

export default preprocess;