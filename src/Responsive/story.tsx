import centered from "@storybook/addon-centered";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import responsive from ".";

interface Props {
  title: string;
}

const DesktopView = (props: Props) => <p>DESKTOP {props.title}</p>;

const TabletView = (props: Props) => <p>TABLET {props.title}</p>;

const MobileView = (props: Props) => <p>MOBILE {props.title}</p>;

const ResponsiveView = responsive({
  desktopView: DesktopView,
  tabletView: TabletView,
  mobileView: MobileView
});

storiesOf("Responsive", module)
  .addDecorator(centered)
  .add("basic", () => (
    <ResponsiveView title="Sample" />
  ));
