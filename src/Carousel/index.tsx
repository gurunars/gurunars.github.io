import type { ReactElement } from 'react'

import responsive from '../Responsive'
import Desktop from './Desktop'
import Mobile from './Mobile'
import type Props from './Props'

const Carousel: (props: Props) => ReactElement = responsive({
  desktopView: Desktop,
  mobileView: Mobile,
})

export default Carousel
