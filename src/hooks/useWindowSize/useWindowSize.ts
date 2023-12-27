import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

/**
 * @useWindowSize - useWindowSize hook useful for retrieving and tracking the dimensions of the browser window
 * @returns {width}
 * @returns {height}
 */

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // callback to update width and height when resize
  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial size on mount
      updateWindowSize()
      let timerId: string | number | NodeJS.Timeout | undefined
      const handleResize = () => {
        // Throttle the resize to limit updates after 200ms
        clearTimeout(timerId)
        timerId = setTimeout(updateWindowSize, 200)
      }

      window.addEventListener('resize', handleResize)
      // Clean up on unmount
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  return {
    width: windowSize.width,
    height: windowSize.height
  }
}
