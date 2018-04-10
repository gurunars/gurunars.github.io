import * as React from "react";

type Props = {
  children: (hash: string) => React.ReactElement<any>
};

type State = {
  hash: string
};

export default class HashAware extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      hash: ""
    };
  }

  render() {
    return this.props.children(this.state.hash);
  }

  updateHash = () => {
    this.setState({
      hash: window.top.location.hash
    });
  }

  componentWillMount() {
    this.updateHash();
  }

  componentDidMount() {
    window.top.addEventListener("hashchange", this.updateHash);
  }

  componentWillUnmount() {
    window.top.removeEventListener("hashchange", this.updateHash);
  }

}
