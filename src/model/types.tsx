export interface Reference {
    alias: string;
    name: string;
    url: string;
    type: string;
}

export interface Meta {
    self: string;
    name: string;
    domainName: string;
    languages: Array<string>;
    birthday: string;
    specialization: Array<string>;
    avatar: string;
    media: Array<string>;
}

export type ItemType = "openSource" | "freelance" | "fullTimeJob" | "education";

export interface Item {
    title: string;
    achievements: Array<string>;
    location: Reference;
    references: Array<Reference>;
    type: ItemType;
    tags: Array<string>;
    description: string;
    links: Array<Reference>;
    startDate: Date | null;
    endDate: Date | null;
    date: Date | null;
    /* AUTOGEN FIELDS */
    humanReadableType: string;
    bgColor: string;
    titleFirstChar: string;
    timestamp: Date;
    year: number | "NOW";
    id: number;
    locationName: string;
}

export type SkillTree = { [key: string]: number };

export interface Portfolio {
    references: Array<Reference>;
    items: Array<Item>;
    meta: Meta;
}

type MappingType = { [key: string]: [string, string] };

export const ItemTypeMapping: MappingType = {
    openSource: ["Open Source", "PaleGreen"],
    freelance: ["Freelance", "MistyRose"],
    fullTimeJob: ["Full time job", "Lavender"],
    education: ["Education", "Silver"]
};
