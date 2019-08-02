import React from "react";
import { useBoxState } from "../Box";

import PlainPageWithSideMenu from ".";
import multiTypeStory from "../Responsive/multitype";

function View() {
  return (
    <PlainPageWithSideMenu
      menuTitle="menu"
      contentTitle="content"
      menu={
        <p
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            paddingRight: 20
          }}
        >
          MENU
        </p>
      }
      children={
        <p
          onClick={() => console.log("CLICKED")}
          style={{
            width: "100%",
            height: "100%",
            paddingRight: 20
          }}
        >
          CONTENT
        </p>
      }
      menuIsVisible={useBoxState(true)}
    />
  );
}

multiTypeStory("PageWithSideMenu", () => <View />);
