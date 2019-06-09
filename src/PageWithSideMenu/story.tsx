import React from "react";
import { useBoxState } from "../Box";

import PlainPageWithSideMenu from ".";
import multiTypeStory from "../Responsive/multitype";

function View() {
  return (
    <PlainPageWithSideMenu
      menuTitle="menu"
      contentTitle="content"
      menu={<p style={{ paddingRight: 20 }}>MENU</p>}
      children={<p>CONTENT</p>}
      menuIsVisible={useBoxState(true)}
    />
  );
}

multiTypeStory("PageWithSideMenu", () => <View />);
