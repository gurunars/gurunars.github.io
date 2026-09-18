import { useBoxState } from '../Box'
import { desktopFrame, mobileFrame } from '../Responsive/multitype'
import PlainPageWithSideMenu from '.'

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
    menuIsVisible={useBoxState(false)}
  >
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
  </PlainPageWithSideMenu>
)

export default { title: 'PageWithSideMenu' }

export const Desktop = () => desktopFrame(<View />)

export const Mobile = () => mobileFrame(<View />)
