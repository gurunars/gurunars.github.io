import responsive from "../Responsive";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import Props from "./Props";

const Carousel: (props: Props) => JSX.Element = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default Carousel;
