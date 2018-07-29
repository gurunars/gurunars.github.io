import * as React from "react";
import responsive from "../Responsive";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import Props from "./Props";

const Carousel: (props: Props) => React.ReactElement<any> = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default Carousel;
