import * as React from "react";
import { compose, withProps } from "recompose";
import { withBoxState } from "../Box";

import Main from ".";
import multiTypeStory from "../Responsive/multitype";

const genItem = (title: string, location: string, type: string) => ({
  title,
  achievements: ["one", "two", "three"],
  location: {
    name: location,
    url: "url-to-loc"
  },
  references: [
    {
      name: "Name of the ref1",
      url: "url-to-ref1"
    },
    {
      name: "Name of the ref2",
      url: "url-to-ref2"
    },
    {
      name: "Name of the ref3",
      url: "url-to-ref3"
    }
  ],
  type,
  tags: ["one", "two", "three"],
  description: "Item description",
  links: [
    {
      name: "Name of the lnk1",
      url: "url-to-lnk1",
      type: "amazon"
    },
    {
      name: "Name of the lnk2",
      url: "url-to-lnk2",
      type: "github"
    },
    {
      name: "Name of the lnk3",
      url: "url-to-lnk3",
      type: "email"
    }
  ],
  duration: {
    start: new Date(2017, 11, 11, 11, 11, 11, 11)
  }
});

const items = [
  genItem("One", "Foo Bar", "freelance"),
  genItem("Two", "Foo Bar", "freelance"),
  genItem("Three", "Foo Bar", "openSource"),
  genItem("Four", "Foo Bar", "openSource"),
  genItem("Five", "Foo Bar", "fullTimeJob"),
  genItem("Six", "Foo Bar", "fullTimeJob"),
  genItem("Seven", "Foo Bar", "education"),
  genItem("Eight", "Foo Bar", "education"),
  genItem("Nine", "Foo Bar", "certificates"),
  genItem("Ten", "Foo Bar", "certificates"),
  genItem("Eleven", "Foo Bar", "contactCard"),
  genItem("Twelve", "Foo Bar", "contactCard")
];

const StateMain = compose(
  withProps({
    portfolio: {
      items
    }
  }),
  withBoxState("selectedId", null),
  withBoxState("selectedSpecs", [
    "freelance",
    "openSource",
    "fullTimeJob",
    "education",
    "certificates",
    "contactCard"
  ]),
  withBoxState("selectedGroup", "startYear"),
  withBoxState("menuIsVisible", true),
  withBoxState("selectedTag", "one")
)(Main);

multiTypeStory("Site", () => <StateMain />);
