import * as React from "react";
import { compose, withProps } from "recompose";
import { withBoxState } from "../Box";

import PlainPageWithSideMenu from ".";
import multiTypeStory from "../Responsive/multitype";

const View = compose(
  withProps({
    menuTitle: "menu",
    contentTitle: "content",
    menu: <p style={{ paddingRight: 20 }}>MENU</p>,
    children: <p>CONTENT</p>
  }),
  withBoxState("menuIsVisible", true)
)(PlainPageWithSideMenu);

multiTypeStory("PageWithSideMenu", () => <View />);
