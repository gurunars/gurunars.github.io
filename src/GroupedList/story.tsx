import multiTypeStory from '../Responsive/multitype'

import Grouping from '.'
import { groupItems } from './grouping'

interface Item {
  type: string;
  title: string;
}

const items: Item[] = [
  { type: 'two', title: 'D' },
  { type: 'two', title: 'F' },
  { type: 'two', title: 'E' },
  { type: 'one', title: 'B' },
  { type: 'one', title: 'C' },
  { type: 'three', title: 'G' },
  { type: 'three', title: 'I' },
  { type: 'one', title: 'A' },
  { type: 'three', title: 'H' },
]

multiTypeStory('GroupedList', () => (
  <Grouping
    items={groupItems(items, item => item.type, item => item.title)}
    renderItem={(props: { item: Item }) => <h1>{props.item.title}</h1>}
  />
))
