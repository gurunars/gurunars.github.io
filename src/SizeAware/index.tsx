import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactElement<any>
}

const getSize = () => ({
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
})

export const SizeContext = React.createContext(getSize())

const SizeAware = ({ children }: Props) => {
  const [size, setSize] = useState(getSize())

  useEffect(() => {
    const updateDimensions = () => setSize(getSize())
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return (
    <SizeContext.Provider
      value={{
        width: size.width,
        height: size.height,
      }}
    >
      {children}
    </SizeContext.Provider>
  )
}

export default SizeAware
