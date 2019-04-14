import * as React from "react";

import { FullSize } from "../Layouts";
import { Link, LinkPreview } from "../Link";
import PageWithOverlay from "../PageWithOverlay";

interface MappingSpec {
  [key: string]: Link;
}

interface Props {
  links: Link[];
  children: React.ReactNode;
}

// TODO: add some beautification to the links to show them
// as previews with extra meta data
interface State {
  link?: Link | null;
  oldUrl?: string | null;
}

const PREFIX = "#sh/";

export const shorten = (link: Link) => PREFIX + link.alias;

export default class Shortener extends React.Component<Props, State> {
  public state: State;

  private mapping: MappingSpec;

  constructor(props: Props) {
    super(props);
    this.openUrl = this.openUrl.bind(this);
    this.onClose = this.onClose.bind(this);
    this.clear = this.clear.bind(this);
    this.mapping = {};
    this.state = {};
    props.links.forEach(it => {
      this.mapping[it.alias] = it;
    });
  }
  public componentDidMount() {
    window.top.addEventListener("hashchange", this.openUrl);
  }
  public componentWillUnmount() {
    window.top.removeEventListener("hashchange", this.openUrl);
  }
  public render() {
    console.log(this.state);

    return (
      <PageWithOverlay
        foregroundContent={
          this.state.link && (
            <LinkPreview
              link={this.state.link as Link}
              onClose={this.onClose}
            />
          )
        }
      >
        <FullSize>{this.props.children}</FullSize>
      </PageWithOverlay>
    );
  }

  private clear() {
    this.setState({
      link: null,
      oldUrl: null
    });
  }

  private openUrl(event: HashChangeEvent) {
    const newUrl = new URL(event.newURL).hash;
    const oldUrl = new URL(event.oldURL).hash;

    if (!newUrl.startsWith(PREFIX)) {
      this.clear();
      return;
    }

    const slug = newUrl.replace(new RegExp("^" + PREFIX), "");

    this.setState({
      link: this.mapping[slug],
      oldUrl: oldUrl.startsWith(PREFIX) ? null : oldUrl
    });
  }

  private onClose() {
    this.clear();
    window.top.location.hash = this.state.oldUrl || "";
  }
}
