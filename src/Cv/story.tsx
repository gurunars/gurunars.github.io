import Centralized from '../Centralized'

import { PORTFOLIO } from '../Site/story'

import Cv from '.'

export default { title: 'Cv' }

export const Basic = () => (
  <Centralized>
    <div
      style={{
        width: 800,
        height: 600,
      }}
    >
      <Cv portfolio={PORTFOLIO} />
    </div>
  </Centralized>
)
