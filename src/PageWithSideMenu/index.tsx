import React from 'react'
import { merge } from 'immutable'
import { useState, useEffect } from 'react'

import Box from '../Box'
import { FullSize } from '../Layouts'
import responsive from '../Responsive'

import ActionIcon from '../ActionIcon'

import { ReactComponent as Close } from './icons/close.svg'
import { ReactComponent as Menu } from './icons/menu.svg'

interface Props {
  menu: JSX.Element
  children: JSX.Element
}

export interface MenuVisibility {
  menuIsVisible: Box<boolean>
}

const Desktop = (props: Props): JSX.Element => (
  <FullSize style={{ flexDirection: 'row' }}>
    <div
      style={{
        position: 'relative',
        height: '100%',
      }}
    >
      {props.menu}
    </div>
    <div
      style={{
        position: 'relative',
        height: '100%',
        flex: '1 1 auto',
        overflowY: 'auto',
      }}
    >
      {props.children}
    </div>
  </FullSize>
)

type TProps = Props & MenuVisibility

const DURATION = 250
const FPS = 240
const CHUNKS = Math.ceil((DURATION / 1000) * FPS)
const DELAY = DURATION / CHUNKS
const STEP = 1 / CHUNKS

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const BaseStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
}


// eslint-disable-next-line max-statements
const MobileClass = (props: TProps) => {
  const [value, setValue] = useState(props.menuIsVisible.get() ? 1 : 0)
  const [wasVisible, setWasVisible] = useState(false)

  const icon = value > 0.5 ? <Close /> : <Menu />
  const shouldShowMenu = value > 0
  const scale = Math.abs(0.5 - value) * 2
  const rotation = value * 360

  const animate = async (
    step: number,
    limit: number,
    checkBoundary: (it: number, limitInner: number) => boolean,
  ) => {
    for (let i = value; checkBoundary(i, limit); i += step) {
      setValue(i)
      await sleep(DELAY)
    }
    await sleep(DELAY)
    setValue(limit)
  }

  const close = async () => {
    await animate(-STEP, 0, (it: number, limit: number) => it >= limit)
  }

  const open = async () => {
    await animate(STEP, 1, (it: number, limit: number) => it <= limit)
  }

  useEffect(() => {
    const isVisible = props.menuIsVisible.get()
    setWasVisible(isVisible)

    if (wasVisible && !isVisible) {
      close()
    } else if (!wasVisible && isVisible) {
      open()
    } else {
      // Do nothing
    }
  },
    // eslint-disable-next-line
    [props.menuIsVisible, wasVisible, value]
  )

  return (
    <FullSize style={{ overflow: 'hidden' }}>
      <div style={BaseStyle}>{props.children}</div>
      {shouldShowMenu && (
        <div
          style={merge(BaseStyle, { opacity: value })}
        >
          {props.menu}
        </div>
      )}

      <ActionIcon
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        rotation={rotation}
        scale={scale}
        onClick={() => props.menuIsVisible.set(!props.menuIsVisible.get())}
        icon={icon}
      />
    </FullSize>
  )
}

const Mobile = (props: Props & MenuVisibility) => <MobileClass {...props} />

const PageWithSideMenu = responsive({
  desktopView: Desktop,
  mobileView: Mobile,
})

export default PageWithSideMenu
