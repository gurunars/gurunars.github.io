import { action } from 'storybook/actions'

import Centralized from '../Centralized'
import ActionIcon from '.'
import Close from './close.svg?react'

export default { title: 'ActionIcon' }

export const Basic = () => (
  <Centralized>
    <ActionIcon onClick={action('onClick')}>
      <Close />
    </ActionIcon>
  </Centralized>
)
