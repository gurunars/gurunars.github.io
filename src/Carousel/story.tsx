import { action } from 'storybook/actions'
import { desktopFrame, mobileFrame } from '../Responsive/multitype'
import Carousel from '.'

interface Item {
  title: string
}

const item: Item = {
  title: 'Item one',
}

const items: Item[] = [
  {
    title: 'Item zero',
  },
  item,
  {
    title: 'Item two',
  },
]

const view = () => (
  <Carousel size={items.length} selectedPosition={1} close={action('CLOSE')} goTo={action('GO TO')}>
    {(pos: number) => <div>{items[pos].title}</div>}
  </Carousel>
)

export default { title: 'Carousel' }

export const Desktop = () => desktopFrame(view())

export const Mobile = () => mobileFrame(view())
