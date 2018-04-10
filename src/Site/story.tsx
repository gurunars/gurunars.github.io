import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, compose, withProps } from "recompose";

import Main from ".";

const META = {
  name: "John Wick",
  languages: ["EN", "RU"],
  birthday: new Date("1959.03.24"),
  specialization: ["Shoot", "Steal", "Blackmail"],
  avatar: "https://img-www.tf-cdn.com/movie/2/john-wick-chapter-two-2017" +
    ".jpeg?_v=20170202222435&fit=crop&crop=faces%20top&w=400&h=400",
  media: [
    {
      type: "amazon",
      url: "wherever",
      name: "Ama Zone"
    }
  ]
};

const genItem = (title: string, location: string, type: string) => ({
  title: title,
  achievements: [
    "one",
    "two",
    "three"
  ],
  location: {
    name: location,
    url: "url-to-loc"
  },
  references: [
    {
      name: "Name of the ref1",
      url: "url-to-ref1"
    }, {
      name: "Name of the ref2",
      url: "url-to-ref2"
    }, {
      name: "Name of the ref3",
      url: "url-to-ref3"
    }
  ],
  type: type,
  tags: ["one", "two", "three"],
  description: "Item description",
  links: [
    {
      name: "Name of the lnk1",
      url: "url-to-lnk1",
      type: "amazon"
    }, {
      name: "Name of the lnk2",
      url: "url-to-lnk2",
      type: "github"
    }, {
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
  genItem("Eight", "Foo Bar", "education")
];

const StateMain = compose(
  withProps({
    portfolio: {
      meta: META,
      items: items
    }
  }),
  withState(
    "selectedId",
    "selectedIdOnChange",
    null
  ),
  withState(
    "selectedSpecs",
    "selectedSpecsOnChange",
    []
  ),
  withState(
    "selectedGroup",
    "selectedGroupOnChange",
    null
  ),
  withState(
    "menuIsVisible",
    "menuIsVisibleOnChange",
    true
  )
)(Main);

storiesOf("Site", module)
  .addDecorator(host({
    height: 600,
    width: 1300,
  }))
  .add("basic", () => (
    <StateMain />
  ));