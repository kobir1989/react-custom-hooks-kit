import { useEffect, useState } from 'react'

/**
 * @useMediaQuery - custom hook for real-time responsiveness to dynamic changes in the viewport.
 * @param query - string
 * @returns {matches - boolean}
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(`only screen and (${query})`)

      const mediaQueryListener = (event: MediaQueryListEvent): void => {
        setMatches(event.matches)
      }

      // Update initial matches
      setMatches(mediaQuery.matches)

      // Add listener for changes in media query
      mediaQuery.addEventListener('change', mediaQueryListener)

      // Clean up listener on unmount
      return () => {
        mediaQuery.removeEventListener('change', mediaQueryListener)
      }
    } else {
      // handle non-client side scenarios.
      setMatches(false)
    }
  }, [query])

  return matches
}
