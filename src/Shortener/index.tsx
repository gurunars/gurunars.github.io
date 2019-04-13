import * as React from "react";

import { Link } from "../Link";

export interface MappingSpec {
  [key: string]: string;
}

interface Props {
  links: Link[];
  children: React.ReactNode;
}

export const PREFIX = "sh";

export default class Shortener extends React.Component<Props> {
  mapping: MappingSpec;

  constructor(props: Props) {
    super(props);
    this.openUrl = this.openUrl.bind(this);
    this.mapping = {};
    props.links.forEach(it => {
      this.mapping[it.alias] = it.url;
    });
  }
  public componentDidMount() {
    window.top.addEventListener("hashchange", this.openUrl);
  }
  public componentWillUnmount() {
    window.top.removeEventListener("hashchange", this.openUrl);
  }
  public render() {
    return this.props.children;
  }
  private openUrl() {
    const hash = window.top.location.hash;
    const prefix = "#" + PREFIX + "/";

    if (!hash.startsWith(prefix)) {
      return;
    }

    const slug = hash.replace(new RegExp("^" + prefix), "");
    const url = this.mapping[slug];
    window.open(url);
  }
}
