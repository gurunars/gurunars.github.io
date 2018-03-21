import * as React from "react";

type Props = {
  children: (width: number, height: number) => React.ReactElement<any>
};

type State = {
  width: number,
  height: number
};

export default class SizeAware extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  render() {
    return this.props.children(
      this.state.width,
      this.state.height
    );
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth,
      height: window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
    });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

}