import React from "react";
import posed from "react-pose";

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

const KeyTransition = ({ from, to }: { from: number; to: number }) => ({
  type: "keyframes",
  values: [from, Math.abs(from - to) / 2, to],
  times: [0, 0.5, 1],
  duration: 500
});

const Rotatable = posed.div({
  open: {
    rotate: 360,
    scale: 1,
    transition: KeyTransition
  },
  closed: {
    rotate: 0,
    scale: 1,
    transition: KeyTransition
  }
});

class MobileClass extends React.Component<Props & MenuVisibility> {
  state: {
    actualIsOpen: boolean;
  };

  constructor(props: Props & MenuVisibility) {
    super(props);
    this.state = {
      actualIsOpen: props.menuIsVisible.get()
    };
  }

  get desiredIsOpen() {
    return this.props.menuIsVisible.get();
  }

  render(): JSX.Element {
    const props = this.props;

    return (
      <FullSize style={{ overflow: "hidden" }}>
        <FullSize style={{ overflowY: "auto", display: "initial" }}>
          {this.state.actualIsOpen ? props.menu : props.children}
        </FullSize>

        <Rotatable
          style={{
            position: "absolute",
            bottom: 20,
            right: 20
          }}
          onClick={() => props.menuIsVisible.set(!this.desiredIsOpen)}
          pose={this.desiredIsOpen ? "open" : "closed"}
          onValueChange={{
            scale: it => {
              const isInvisible = it.toFixed(2) == 0.0;
              if (isInvisible) {
                this.setState({ actualIsOpen: this.desiredIsOpen });
              }
            }
          }}
        >
          <ActionIcon
            onClick={() => {}}
            icon={this.state.actualIsOpen ? <Close /> : <Menu />}
          />
        </Rotatable>
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
