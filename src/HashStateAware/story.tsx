import centered from '@storybook/addon-centered'
import { storiesOf } from '@storybook/react'

import HashAware from '.'

interface Field {
  field: number;
}

storiesOf('HashAware', module)
  .addDecorator(centered)
  .add('basic', () => (
    <HashAware prefix="" initial={{ field: 1 }}>
      {(data: Field, set: (innerData: Field) => void) => (
        <div>
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => set({ field: data.field + 1 })}
          >
            Data: {data.field}
          </p>
        </div>
      )}
    </HashAware>
  ))
