import * as React from "react";

import { SizeContext } from "../SizeAware";

const isMobile = () => navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i);

type ElementSupplier<Props> = (props?: Props) => React.ReactElement<any>;

export interface ForcedLayout {
  type?: "desktop" | "tablet" | "mobile";
}

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

  return (props: ForcedLayout & Props) => (
    <SizeContext.Consumer>
      {size => {
        if (props.type === "mobile" || isMobile() || size.width < 770) {
          return mobileView != null ? mobileView(props) : desktopView(props);
        } else if (props.type === "tablet" || size.width < 1250) {
          return tabletView != null ? tabletView(props) : desktopView(props);
        } else {
          return desktopView(props);
        }
      }}
    </SizeContext.Consumer>
  );
};

export default responsive;