import { useEffect, useRef, useState } from 'react'

// structure of mouse position state
interface MousePosition {
  x: number
  y: number
}
// return type of the hook
type UseMousePositionReturnType = [
  MousePosition,
  React.MutableRefObject<HTMLElement | null>
]

/**
 * @useMousePosition - hook returns the current mouse position and a reference to an HTML element.
 * @returns {currentMousePosition}
 * @returns {elementRef - ref}
 */

export const useMousePosition = (): UseMousePositionReturnType => {
  const [currentMousePosition, setCurrentMousePosition] =
    useState<MousePosition>({
      x: 0,
      y: 0
    })

  const elementRef = useRef<HTMLElement | null>(null)

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
  }, [])

  return [currentMousePosition, elementRef]
}
