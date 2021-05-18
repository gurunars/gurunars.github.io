import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'

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
      url: 'url-to-lnk1',
      type: 'amazon',
    },
    {
      alias: 'lnk2',
      name: 'Name of the lnk2',
      url: 'url-to-lnk2',
      type: 'github',
    },
    {
      alias: 'lnk3',
      name: 'Name of the lnk3',
      url: 'url-to-lnk3',
      type: 'email',
    },
  ],
  duration: {
    start: new Date(2017, 11, 11, 11, 11, 11, 11),
    end: new Date(),
  },
}

storiesOf('Item', module)
  .addDecorator(
    host({
      align: 'center bottom',
      height: 600,
      width: 800,
    }),
  )
  .add('small', () => <Small item={item} onClick={action('OpenItem')} />)
  .add('large', () => <Large item={item} />)
