import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import centered from "@storybook/addon-centered";

import PageWithSideMenu from ".";
/*
storiesOf("PageWithSideMenu", module)
  .addDecorator(centered)
  .add("basic", () => (
    <PageWithSideMenu 
      menuTitle="Menu"
      contentTitle="Content"
      menu={<div>MENU</div>}
      content={<div>CONTENT</div>}
    />
  ));
  */