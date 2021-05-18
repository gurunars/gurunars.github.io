import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import { CircleUrl, FullUrl, LinkPreview, MappingSpec, Url } from ".";

const MAP: MappingSpec = {
  sample: {
    alias: "alias",
    name: "name",
    url: "foobar-zoo-loo"
  }
};

storiesOf("Link", module)
  .addDecorator(
    host({
      align: "center middle",
      height: 200,
      width: 200
    })
  )
  .add("Url", () => (
    <Url
      link={{
        alias: "bar",
        name: "FOO",
        url: "bar"
      }}
    />
  ))
  .add("FullUrl with type", () => (
    <FullUrl
      style={{
        color: "red"
      }}
      link={{
        alias: "bar",
        name: "FOO",
        url: "bar",
        type: "amazon"
      }}
    />
  ))
  .add("CircleUrl with type", () => (
    <CircleUrl
      link={{
        alias: "bar",
        name: "FOO",
        url: "bar",
        type: "amazon"
      }}
    />
  ))
  .add("CircleUrl without type", () => (
    <CircleUrl
      link={{
        alias: "bar",
        name: "FOO",
        url: "bar"
      }}
    />
  ))
  .add("Link preview", () => <LinkPreview links={MAP} alias="sample" />);
