import { MutableRefObject, useEffect, useState } from 'react'

interface Options extends IntersectionObserverInit {
  stopOnceVisible: boolean
}
// Return type of the hook
type Entry = IntersectionObserverEntry | null

/**
 * @useIntersectionObserver
 * @param ref - MutableRefObject
 * @param options - {threshold, root, rootMargin, stopOnceVisible}
 * @returns {intersectionEntry} - Entry
 */

export const useIntersectionObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  {
    threshold = 0.3,
    root = null,
    rootMargin = '0%',
    stopOnceVisible = false
  }: Options
): Entry => {
  const [intersectionEntry, setIntersectionEntry] = useState<Entry>(null)

  // Check if the intersection should stop when visible.
  const shouldStop = intersectionEntry?.isIntersecting && stopOnceVisible

  // Update intersection entry
  const updateIntersectionEntry = ([entries]: IntersectionObserverEntry[]) => {
    setIntersectionEntry(entries)
  }

  useEffect(() => {
    // current element ref
    const targetElemet = ref.current
    const hasIntersectionObserver = !!window.IntersectionObserver

    // Check if the element exists, shouldStop is true and the Intersection Observer API is supported.
    if (!targetElemet || shouldStop || !hasIntersectionObserver) return

    const observer = new IntersectionObserver(updateIntersectionEntry, {
      threshold,
      root,
      rootMargin
    })

    observer.observe(targetElemet)

    // Disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [ref?.current, shouldStop, JSON.stringify(threshold), root, rootMargin])

  return intersectionEntry
}
