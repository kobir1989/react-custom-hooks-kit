import { useState, useEffect, Dispatch, SetStateAction } from 'react'

/**
 * @useLocalStorage - Custom hook - Store, retrieve, and synchronize data from the browser’s localStorage API with useLocalStorage
 * @param key - string
 * @param initialValue - T (*any type of data)
 * @returns {[savedValue, setSavedValue]} - Array
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [null | T, Dispatch<SetStateAction<T | null>>] => {
  const [savedValue, setSavedValue] = useState<null | T>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue
    } catch (_error) {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(savedValue))
  }, [key, savedValue])

  return [savedValue, setSavedValue]
}
