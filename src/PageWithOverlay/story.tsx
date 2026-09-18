import Centralized from '../Centralized'

import PageWithOverlay from '.'

export default { title: 'PageWithOverlay' }

export const WithOverlay = () => (
  <Centralized>
    <div
      style={{
        width: 800,
        height: 600,
      }}
    >
      <PageWithOverlay foregroundContent={<p>Foreground content</p>}>
        <p>Background content</p>
      </PageWithOverlay>
    </div>
  </Centralized>
)

export const WithoutOverlay = () => (
  <Centralized>
    <div
      style={{
        width: 800,
        height: 600,
      }}
    >
      <PageWithOverlay>
        <p>Background content</p>
      </PageWithOverlay>
    </div>
  </Centralized>
)
