import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import About from ".";

const META = {
  name: "John Wick",
  languages: ["EN", "RU"],
  birthday: "24.03.1959",
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
    <About color="black" meta={META} />
  )); 
