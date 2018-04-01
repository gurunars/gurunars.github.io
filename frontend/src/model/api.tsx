// @flow

import jsyaml from 'js-yaml';
import $ from 'jquery';

import {hashCode, merge} from './utils';


export type Reference = {
    alias : string;
    name : string;
    url : string;
    type : string;
}


export type Meta = {
    self : string;
    name : string;
    domainName : string;
    languages : Array<string>;
    birthday : string;
    specialization : Array<string>;
    avatar : string;
    media : Array<string>;
}


export type ItemType = "openSource" | "freelance" | "fullTimeJob" | "education";


export type Item = {
    title : string;
    achievements : Array<string>;
    location : Reference;
    references : Array<Reference>;
    type : ItemType;
    tags : Array<string>;
    description : string;
    links : Array<Reference>;
    startDate : ?Date;
    endDate : ?Date | "NOW";
    date : ?Date;
    /* AUTOGEN FIELDS */
    humanReadableType : string;
    bgColor : string;
    titleFirstChar : string;
    timestamp : Date;
    year : number | "NOW";
    id : number;
    locationName : string;
}


export type SkillTree = { [key: string]: number };


export type Portfolio = {
    references : Array<Reference>;
    items : Array<Item>;
    meta : Meta;
}


export const ItemTypeMapping : {[key : ItemType] : [string, string]} = {
    openSource: ["Open Source", "PaleGreen"],
    freelance: ["Freelance", "MistyRose"],
    fullTimeJob: ["Full time job", "Lavender"],
    education: ["Education", "Silver"]
};


function preProcessDoc(portfolio : string) : Portfolio {
    var doc = jsyaml.load(portfolio);

    function getReference(alias : string) : Reference {
        for (var i=0; i < doc.references.length; i++) {
            var reference = doc.references[i];
            if (alias == reference.alias) {
                return reference;
            }
        }
        return {
            alias : alias,
            name : "Unknown",
            url : "unknown",
            type : "unknown"
        };
    }

    doc.meta.media = doc.meta.media.map(getReference);

    var items = [];
    for (var i=0; i < doc.items.length; i++) {
        var item = doc.items[i];

        var timestamp;
        var year;
        if (item.date != null) {
            timestamp = new Date(item.date);
            year = timestamp.getFullYear();
        } else if (!item.endDate || 0 == item.endDate.length) {
            item.endDate = "NOW";
            timestamp = new Date();
            year = "NOW";
        } else {
            timestamp = new Date(item.startDate);
            year = timestamp.getFullYear();
        }

        item = merge({
            date: null,
            endDate: null,
            startDate: null,
            location: doc.meta.self,
            shortDescription: "",
            tags: [],
            humanReadableType: ItemTypeMapping[item.type][0],
            bgColor: ItemTypeMapping[item.type][1],
            titleFirstChar: item.title[0],
            timestamp: timestamp,
            year: year
        }, item);

        if (item.hasOwnProperty("references")) {
            item.references = item.references.map(getReference);
        }

        if (item.hasOwnProperty("links")) {
            item.links = item.links.map(getReference);
        }

        item.id = hashCode(item.location + ":" + item.title);
        item.location = getReference(item.location);
        item.locationName = item.location.name;

        items.push(item);
    }

    return merge(doc, {
        "items": items
    });
}


export function getPortfolio(callback : (portfolio : Portfolio) => void) {
    $.ajax({
        url: '/personal/portfolio.yaml?v16',
        type: 'get',
        async: true,
        success: function(portfolio : string) {
            callback(preProcessDoc(portfolio));
        }
    });
}
