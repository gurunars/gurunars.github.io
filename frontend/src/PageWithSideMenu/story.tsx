import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";
import { withState } from "recompose";

import PlainPageWithSideMenu from ".";

const PageWithSideMenu = withState(
  "menuIsVisible",
  "menuIsVisibleOnChange",
  true
)(PlainPageWithSideMenu);

storiesOf("PageWithSideMenu", module)
  .addDecorator(centered)
  .add("basic", () => (
    <PageWithSideMenu
      menu={<div>MENU</div>}
      content={<div>CONTENT</div>}
    />
  ));
