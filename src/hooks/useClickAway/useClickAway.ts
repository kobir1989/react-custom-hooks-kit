import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { EVENTS } from '../../constants'

// click event types
type ClickEventType = MouseEvent | TouchEvent | PointerEvent

// return type of the hook
interface UseClickAwayReturnType {
  enable(): void
  disable(): void
}
/**
 * @useClickAway - Listens for clicks outside the element.
 * @param ref - MutableRefObject
 * @param  onClickAway - callback
 * @return {enable} - function
 * @return {disable} - function
 */
export const useClickAway = (
  ref: MutableRefObject<HTMLElement | null>,
  onClickAway: () => void
): UseClickAwayReturnType => {
  const [isEnabled, setIsEnabled] = useState(true)

  // Handle outside click
  const handleClickAway = useCallback((e: ClickEventType) => {
    if (
      isEnabled &&
      ref.current &&
      !ref.current.contains(e.target as Element)
    ) {
      onClickAway()
    }
  }, [])

  useEffect(() => {
    if (!ref || !ref.current) return
    // check if outside click is true than add eventListeners.
    if (isEnabled) {
      const addEventListener = () => {
        EVENTS.forEach(event =>
          document.addEventListener(event, handleClickAway)
        )
      }
      addEventListener()
    } else {
      // if outside click is false, than remove eventListeners.
      const removeEventListener = () => {
        EVENTS.forEach(event =>
          document.removeEventListener(event, handleClickAway)
        )
      }
      return removeEventListener()
    }
  }, [isEnabled, ref, handleClickAway])

  return {
    enable: () => setIsEnabled(true),
    disable: () => setIsEnabled(false)
  }
}
