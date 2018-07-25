import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withProps, compose } from "recompose";
import { withBoxState } from "../Box";

import PlainPageWithSideMenu from ".";

const getWidget = (type: "mobile" | "desktop"): React.ReactElement<any> => {
  const View = compose(
    withProps({
      type: type,
      menuTitle: "menu",
      contentTitle: "content",
      menu: <p style={{ paddingRight: 20 }}>MENU</p>,
      children: <p>CONTENT</p>
    }),
    withBoxState("menuIsVisible", true)
  )(PlainPageWithSideMenu);
  return <View />;
};

storiesOf("PageWithSideMenu", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("mobile", () => (
    getWidget("mobile")
  ))
  .add("desktop", () => (
    getWidget("desktop")
  ));
