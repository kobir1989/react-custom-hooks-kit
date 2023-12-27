import { useEffect, useState } from 'react'

/**
 * @useCountDown - useCountDown - Custom React hook to implement a countdown timer.
 * @param count - number
 * @param delay - number
 * @returns {number} countFrom
 */
export const useCountDown = (count = 50, delay = 100): number => {
  const [countFrom, setCountFrom] = useState(count)

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>

    // Ensuring countFrom doesn't go negative
    if (countFrom <= 0) {
      setCountFrom(0)
      return // Exit early if count is already 0 or negative
    }

    // eslint-disable-next-line prefer-const
    timerId = setInterval(() => {
      setCountFrom(prev => {
        if (prev > 0) {
          return prev - 1
        } else {
          clearInterval(timerId)
          return 0
        }
      })
    }, delay)

    return () => {
      clearInterval(timerId)
    }
  }, [countFrom, delay])

  return countFrom
}
