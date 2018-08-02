import * as React from "react";

import responsive from ".";
import { multiTypeStory } from "./multitype";

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

multiTypeStory("Responsive", () => <ResponsiveView title="Sample" />);