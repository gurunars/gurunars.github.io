import * as React from "react";

import SizeAware from "../SizeAware";

const isMobile = () => navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i);

type ElementSupplier<Props> = (props?: Props) => React.ReactElement<any>;

const responsive = <Props extends {}>(
  { desktopView, mobileView, tabletView }: {
    desktopView: ElementSupplier<Props>,
    mobileView?: ElementSupplier<Props>,
    tabletView?: ElementSupplier<Props>
  }
) => {

  tabletView = tabletView || desktopView || mobileView;
  mobileView = mobileView || tabletView || desktopView;
  desktopView = desktopView || tabletView || mobileView;

  return (props: Props) => (
    <SizeAware>
      {(width, height) => {
        if (isMobile() || width < 770) {
          return desktopView(props);
        } else if (width < 1250) {
          return desktopView(props);
        } else {
          return desktopView(props);
        }
      }}
    </SizeAware>
  );
};

export default responsive;
