import * as React from "react";

interface Props {
  children: (width: number, height: number) => React.ReactElement<any>;
}

interface State {
  width: number;
  height: number;
}

const getSize = () => ({
  width: window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth,
  height: window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
});

export default class SizeAware extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  public render() {
    return this.props.children(
      this.state.width,
      this.state.height
    );
  }

  public updateDimensions = () => {
    this.setState(getSize());
  }

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

export const SizeContext = React.createContext(getSize());