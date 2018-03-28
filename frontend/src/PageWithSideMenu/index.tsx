import responsive from "../Responsive";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

const PageWithSideMenu = responsive({
  desktopView: Mobile,
  mobileView: Mobile
});

export default PageWithSideMenu;
