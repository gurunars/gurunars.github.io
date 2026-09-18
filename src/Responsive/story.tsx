import responsive from '.'
import { desktopFrame, mobileFrame } from './multitype'

interface Props {
  title: string
}

const DesktopView = (props: Props) => <p>DESKTOP {props.title}</p>

const TabletView = (props: Props) => <p>TABLET {props.title}</p>

const MobileView = (props: Props) => <p>MOBILE {props.title}</p>

const ResponsiveView = responsive({
  desktopView: DesktopView,
  tabletView: TabletView,
  mobileView: MobileView,
})

export default { title: 'Responsive' }

export const Desktop = () => desktopFrame(<ResponsiveView title="Sample" />)

export const Mobile = () => mobileFrame(<ResponsiveView title="Sample" />)
