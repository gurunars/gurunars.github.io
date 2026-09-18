import Centralized from '../Centralized'

import SizeAware, { SizeContext } from '.'

export default { title: 'SizeAware' }

export const Basic = () => (
  <Centralized>
    <SizeAware>
      <SizeContext.Consumer>
        {(size) => (
          <div>
            <p>Width: {size.width}</p>
            <p>Height: {size.height}</p>
          </div>
        )}
      </SizeContext.Consumer>
    </SizeAware>
  </Centralized>
)
