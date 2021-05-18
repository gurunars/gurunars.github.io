import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'

import { PORTFOLIO } from '../Site/story'

import Cv from '.'

storiesOf('Cv', module)
  .addDecorator(
    host({
      align: 'center middle',
      height: 600,
      width: 800,
    }),
  )
  .add('basic', () => <Cv portfolio={PORTFOLIO} />)
