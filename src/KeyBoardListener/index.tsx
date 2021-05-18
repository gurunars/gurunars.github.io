import React from 'react'

interface Props {
  children: React.ReactElement<any>;
  keyBoardKey: string;
  onPress: () => void;
}

export default class KeyBoardListener extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.keyHandler = this.keyHandler.bind(this)
  }
  public componentDidMount() {
    document.addEventListener('keydown', this.keyHandler, false)
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.keyHandler, false)
  }
  public render() {
    return this.props.children
  }
  private keyHandler(event: KeyboardEvent) {
    if (event.key === this.props.keyBoardKey) {
      this.props.onPress()
    }
  }
}
