import * as _ from "lodash";

import { Meta } from "./About";
import { Item } from "./Item";
import { TagSpec } from "./Toolbar";

export interface Portfolio {
    meta: Meta;
    importantSkills: TagSpec;
    items: Item[];
}

export const ALL = "All";

const preprocess = (initial: any): Portfolio => {

    const getLink = (alias: string) =>
        _.find(initial.links, link => link.alias === alias);

    const meta = initial.meta;

    return {
        meta: {
            name: meta.name,
            languages: meta.lanuages,
            specialization: meta.specialization,
            avatar: meta.avatar,
            media: _.map(meta.media, getLink),
            birthday: new Date(meta.birthday)
        },
        importantSkills: _.pickBy(
            _.countBy(
                _.flatMap(initial.items, it => (it.tags || []).concat([ALL]))
            ),
            count => count > 1
        ),
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
};

export default preprocess;