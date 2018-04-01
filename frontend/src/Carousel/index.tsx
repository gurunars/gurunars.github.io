import * as React from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import responsive from "../Responsive";
import Props from "./Props";

const Carousel: <T extends {}>(props: Props<T>) => React.ReactElement<any> = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default Carousel;
