import * as React from "react";

import jsonpack from "jsonpack";

import { merge } from "../utils";

interface Props<T extends {}> {
  initial: T;
  prefix: string;
  children: (data: T, set: (data: T) => void) => React.ReactElement<any>;
}

interface State<T extends {}> {
  hash: T;
}

const deserialize = (prefix: string, location: string): Object => {
  try {
    return jsonpack.unpack(location.replace("#" + prefix + "?", ""));
  } catch {
    return {};
  }
};

const serialize = (prefix: string, params: Object): string =>
  "#" + prefix + "?" + jsonpack.pack(params);

export default class HashAware<T extends {}> extends React.Component<
  Props<T>,
  State<T>
> {
  constructor(props: Props<T>) {
    super(props);
    this.updateHash = this.updateHash.bind(this);
    this.state = { hash: props.initial };
  }

  public render() {
    return this.props.children(this.state.hash, data => {
      window.top.location.hash = serialize(this.props.prefix, data);
    });
  }

  public updateHash() {
    this.setState({
      hash: merge(
        this.props.initial,
        deserialize(this.props.prefix, window.top.location.hash)
      ) as T
    });
  }

  public componentWillMount() {
    this.updateHash();
  }

  public componentDidMount() {
    window.top.addEventListener("hashchange", this.updateHash);
  }

  public componentWillUnmount() {
    window.top.removeEventListener("hashchange", this.updateHash);
  }
}
