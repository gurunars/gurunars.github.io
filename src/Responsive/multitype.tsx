import type React from 'react'

import { SizeContext } from '../SizeAware'

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 10,
}

const frame = (outerWidth: number | string, contextWidth: number) =>
  function Frame(children: React.ReactElement): React.ReactElement {
    return (
      <div style={wrapperStyle}>
        <div
          style={{
            width: outerWidth,
            height: 600,
            border: '1px dotted black',
          }}
        >
          <SizeContext.Provider
            value={{
              width: contextWidth,
              height: 100,
            }}
          >
            {children}
          </SizeContext.Provider>
        </div>
      </div>
    )
  }

export const desktopFrame = frame('100%', 3000)

// I do not have tablet specific layouts

export const mobileFrame = frame(500, 500)
