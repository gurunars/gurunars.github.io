import { action } from 'storybook/actions'

import Centralized from '../Centralized'

import KeyBoardListener from '.'

export default { title: 'KeyBoardListener' }

export const Basic = () => (
  <Centralized>
    <KeyBoardListener keyBoardKey="ArrowRight" onPress={action('Pressed')}>
      <p>Press Right Arrow</p>
    </KeyBoardListener>
  </Centralized>
)
