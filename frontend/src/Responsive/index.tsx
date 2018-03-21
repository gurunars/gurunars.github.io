import * as React from "react";

import Resizable from "../Resizable";

const isMobile = () => navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i);

const responsive = <Props extends {}>(
  { desktopView, mobileView, tabletView }: {
    desktopView: (props?: Props) => React.ReactElement<any>,
    mobileView: (props?: Props) => React.ReactElement<any>,
    tabletView: (props?: Props) => React.ReactElement<any>
  }
) => {

  tabletView = tabletView || desktopView || mobileView;
  mobileView = mobileView || tabletView || desktopView;
  desktopView = desktopView || tabletView || mobileView;

  return (props: Props) => (
    <Resizable>
      {(width, height) => {
        if (isMobile() || width < 770) {
          return mobileView(props);
        } else if (width < 1250) {
          return tabletView(props);
        } else {
          return desktopView(props);
        }
      }}
    </Resizable>
  );
};

export default responsive;
