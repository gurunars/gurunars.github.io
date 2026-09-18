import { useBoxState } from '../Box'
import { desktopFrame, mobileFrame } from '../Responsive/multitype'
import Toolbar from '.'

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

export default { title: 'Toolbar' }

export const Desktop = () => desktopFrame(<StateToolbar />)

export const Mobile = () => mobileFrame(<StateToolbar />)
