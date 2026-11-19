import type React from 'react'

import ActionIcon from '../ActionIcon'
import type Box from '../Box'

import Close from './icons/close.svg?react'
import Menu from './icons/menu.svg?react'

import './style.css'

export interface MenuVisibility {
  menuIsVisible: Box<boolean>
}

// A page with a menu: a fixed column beside the content on a wide page; on a
// narrow one a layer over the content, opened and closed by a floating button
// (see style.css, which also owns the fade and the button's morph).
const PageWithSideMenu = (props: { menu: React.JSX.Element; children: React.JSX.Element } & MenuVisibility) => {
  const isOpen = props.menuIsVisible.get()
  return (
    <div className="side-menu" data-open={isOpen}>
      <div className="side-menu-content">{props.children}</div>
      <div className="side-menu-panel">{props.menu}</div>
      <ActionIcon className="side-menu-toggle" onClick={() => props.menuIsVisible.set(!isOpen)}>
        <div className="side-menu-glyph">
          <span className="side-menu-glyph-open">
            <Menu />
          </span>
          <span className="side-menu-glyph-close">
            <Close />
          </span>
        </div>
      </ActionIcon>
    </div>
  )
}

export default PageWithSideMenu
