import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";

import About from ".";

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

storiesOf("About", module)
  .addDecorator(host({
    align: "center middle",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <About meta={META} />
  ));
