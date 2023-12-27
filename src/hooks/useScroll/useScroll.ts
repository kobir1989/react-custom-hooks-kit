import { useEffect, useState } from 'react'

interface UseScrollReturnType {
  currentPosition: number
}

/**
 * @useScroll - useScroll hook manage and update the scroll position whenever it changes.
 * @returns {currentPosition - number}
 */

export const useScroll = (): UseScrollReturnType => {
  const [currentPosition, setCurrentPosition] = useState<number>(window.scrollY)

  // update current scroll position
  const updateCurrentPosition = (): void => {
    setCurrentPosition(window.scrollY)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateCurrentPosition)
    }
    // Clean up after unmount
    return () => {
      window.removeEventListener('scroll', updateCurrentPosition)
    }
  }, [])

  return {
    currentPosition
  }
}
