import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import KeyBoardListener from ".";

storiesOf("KeyBoardListener", module)
  .addDecorator(
    host({
      align: "center middle",
      height: 600,
      width: 800
    })
  )
  .add("basic", () => (
    <KeyBoardListener keyBoardKey="ArrowRight" onPress={action("Pressed")}>
      <p>Press Right Arrow</p>
    </KeyBoardListener>
  ));
