import React from "react";

interface Props {
  children: React.ReactElement<any>;
}

interface State {
  width: number;
  height: number;
}

const getSize = () => ({
  width:
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
  height:
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
});

export const SizeContext = React.createContext(getSize());

export default class SizeAware extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  public render() {
    return (
      <SizeContext.Provider
        value={{
          width: this.state.width,
          height: this.state.height
        }}
      >
        {this.props.children}
      </SizeContext.Provider>
    );
  }

  public updateDimensions = () => {
    this.setState(getSize());
  };

  public componentWillMount() {
    this.updateDimensions();
  }

  public componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}
