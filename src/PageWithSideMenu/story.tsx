import { storiesOf } from "@storybook/react";
import * as React from "react";
import { compose, withProps } from "recompose";
import { host } from "storybook-host";
import { withBoxState } from "../Box";

import addMultiSize from "../Responsive/multitype";

import PlainPageWithSideMenu from ".";

const View = compose(
  withProps({
    menuTitle: "menu",
    contentTitle: "content",
    menu: <p style={{ paddingRight: 20 }}>MENU</p>,
    children: <p>CONTENT</p>
  }),
  withBoxState("menuIsVisible", true)
)(PlainPageWithSideMenu);

const story = storiesOf("PageWithSideMenu", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }));

addMultiSize(story, () => <View />);
