import { useEffect, useState } from 'react'

// structure of mouse position state
interface MousePosition {
  x: number
  y: number
}

/**
 * @useMousePosition - hook returns the current mouse position and a reference to an HTML element.
 * @returns {currentMousePosition} - number
 */

export const useMousePosition = (
  elementRef: React.MutableRefObject<HTMLElement | null>
): MousePosition => {
  const [currentMousePosition, setCurrentMousePosition] =
    useState<MousePosition>({
      x: 0,
      y: 0
    })

  // update mouse position handler
  const updateMousePosition = (e: MouseEvent): void => {
    const { pageX, pageY } = e
    const element = elementRef.current
    //  Update the current mouse position
    if (element) {
      setCurrentMousePosition({
        x: pageX,
        y: pageY
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      updateMousePosition(e)
    }
    const element = elementRef.current
    if (element) element.addEventListener('mousemove', handleMouseMove)
    // Clean up (*Remove event listener on unmount)
    return () => {
      if (element) element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [elementRef.current])

  return currentMousePosition
}
