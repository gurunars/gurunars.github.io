import Centralized from '../Centralized'

import HashAware from '.'

interface Field {
  field: number
}

export default { title: 'HashAware' }

export const Basic = () => (
  <Centralized>
    <HashAware prefix="" initial={{ field: 1 }}>
      {(data: Field, set: (innerData: Field) => void) => (
        <div>
          <p style={{ cursor: 'pointer' }} onClick={() => set({ field: data.field + 1 })}>
            Data: {data.field}
          </p>
        </div>
      )}
    </HashAware>
  </Centralized>
)
