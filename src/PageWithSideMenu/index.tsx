import React from "react";

import Box from "../Box";
import { FullSize } from "../Layouts";
import responsive from "../Responsive";

import ActionIcon from "../ActionIcon";

import { ReactComponent as Close } from "./icons/close.svg";
import { ReactComponent as Menu } from "./icons/menu.svg";

interface Props {
  menuTitle: string;
  contentTitle: string;
  menu: JSX.Element;
  children: JSX.Element;
}

export interface MenuVisibility {
  menuIsVisible: Box<boolean>;
}

const Desktop = (props: Props): JSX.Element => (
  <FullSize style={{ flexDirection: "row" }}>
    <div
      style={{
        position: "relative",
        height: "100%"
      }}
    >
      {props.menu}
    </div>
    <div
      style={{
        position: "relative",
        height: "100%",
        flex: "1 1 auto"
      }}
    >
      {props.children}
    </div>
  </FullSize>
);

type TProps = Props & MenuVisibility;

const DURATION = 250;
const FPS = 240;
const CHUNKS = Math.ceil((DURATION / 1000) * FPS);
const DELAY = DURATION / CHUNKS;
const STEP = 1 / CHUNKS;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface State {
  value: number;
}

class MobileClass extends React.Component<TProps, State> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      value: props.menuIsVisible.get() ? 1 : 0
    };
  }

  componentDidUpdate(prevProps: TProps) {
    const wasVisible = prevProps.menuIsVisible.get();
    const isVisible = this.props.menuIsVisible.get();

    if (wasVisible && !isVisible) {
      this.close();
    } else if (!wasVisible && isVisible) {
      this.open();
    } else {
      // Do nothing
    }
  }

  private get icon() {
    return this.state.value > 0.5 ? <Close /> : <Menu />;
  }

  private get shouldShowMenu() {
    return this.state.value > 0;
  }

  async close() {
    for (var i = this.state.value; i >= 0; i -= STEP) {
      this.setState({ value: Math.max(0, i) });
      await sleep(DELAY);
    }
    await sleep(DELAY);
    this.setState({ value: 0 });
  }

  async open() {
    for (var i = this.state.value; i <= 1; i += STEP) {
      this.setState({ value: Math.min(1, i) });
      await sleep(DELAY);
    }
    await sleep(DELAY);
    this.setState({ value: 1 });
  }

  render(): JSX.Element {
    const props = this.props;

    return (
      <FullSize style={{ overflow: "hidden" }}>
        <div
          style={{
            overflowY: "auto",
            position: "absolute",
            width: "100%",
            height: "100%"
          }}
        >
          {props.children}
        </div>
        {this.shouldShowMenu && (
          <div
            style={{
              overflowY: "auto",
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
          >
            {props.menu}
          </div>
        )}

        <ActionIcon
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            transform: "rotate(" + this.state.value * 360 + "deg)"
          }}
          onClick={() => props.menuIsVisible.set(!props.menuIsVisible.get())}
          icon={this.icon}
        />
      </FullSize>
    );
  }
}

const Mobile = (props: Props & MenuVisibility) => <MobileClass {...props} />;

const PageWithSideMenu = responsive({
  desktopView: Desktop,
  mobileView: Mobile
});

export default PageWithSideMenu;
