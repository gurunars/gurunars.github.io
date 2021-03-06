import { useBoxState } from '../Box'

import PlainPageWithSideMenu from '.'
import multiTypeStory from '../Responsive/multitype'

const View = () => (
  <PlainPageWithSideMenu
    menu={
      <p
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'red',
          paddingRight: 20,
        }}
      >
        MENU
      </p>
    }
    children={
      <p
        onClick={() => console.log('CLICKED')}
        style={{
          width: '100%',
          height: '100%',
          paddingRight: 20,
        }}
      >
        CONTENT
      </p>
    }
    menuIsVisible={useBoxState(false)}
  />
)

multiTypeStory('PageWithSideMenu', () => <View />)
