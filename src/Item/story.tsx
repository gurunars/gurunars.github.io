import { action } from 'storybook/actions'

import Centralized from '../Centralized'

import { Large, Small } from '.'

const item = {
  title: 'Title',
  achievements: ['one', 'two', 'three'],
  location: {
    alias: 'loc',
    name: 'Name of the loc',
    url: 'url-to-loc',
  },
  references: [
    {
      alias: 'ref1',
      name: 'Name of the ref1',
      url: 'url-to-ref1',
    },
    {
      alias: 'ref2',
      name: 'Name of the ref2',
      url: 'url-to-ref2',
    },
    {
      alias: 'ref3',
      name: 'Name of the ref3',
      url: 'url-to-ref3',
    },
  ],
  type: 'sample-type',
  tags: ['one', 'two', 'three'],
  description: 'Item description',
  links: [
    {
      alias: 'lnk1',
      name: 'Name of the lnk1',
      url: 'https://amazon.com/dp/123',
    },
    {
      alias: 'lnk2',
      name: 'Name of the lnk2',
      url: 'https://github.com/example',
    },
    {
      alias: 'lnk3',
      name: 'Name of the lnk3',
      url: 'mailto:someone@example.com',
    },
  ],
  duration: {
    start: new Date(2017, 11, 11, 11, 11, 11, 11),
    end: new Date(),
  },
}

export default { title: 'Item' }

export const SmallItem = () => (
  <Centralized>
    <Small item={item} onClick={action('OpenItem')} />
  </Centralized>
)

export const LargeItem = () => (
  <Centralized>
    <div
      style={{
        width: 800,
        height: 600,
      }}
    >
      <Large item={item} />
    </div>
  </Centralized>
)
