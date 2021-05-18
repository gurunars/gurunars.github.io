import { useBoxState } from '../Box'

import Toolbar from '.'
import multiTypeStory from '../Responsive/multitype'

const StateToolbar = () => (
  <Toolbar
    filterMapping={{
      one: {
        humanReadableName: 'One',
        color: 'Yellow',
      },
      two: {
        humanReadableName: 'Two',
        color: 'LightGreen',
      },
    }}
    groupMapping={{
      one: {
        humanReadableName: 'One',
        groupBy: () => 'group-by-one',
        sortBy: () => 'sort-by-one',
        reverse: true,
      },
      two: {
        humanReadableName: 'Two',
        groupBy: () => 'group-by-two',
        sortBy: () => 'sort-by-two',
        reverse: false,
      },
    }}
    allTags={{
      one: 1,
      two: 2,
    }}
    selectedSpecs={useBoxState(['one'])}
    selectedGroup={useBoxState('one')}
    selectedTag={useBoxState('one')}
  />
)

multiTypeStory('Toolbar', () => <StateToolbar />)
