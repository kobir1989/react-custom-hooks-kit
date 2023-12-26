import { useCallback, useEffect, useState } from 'react'

// structure of useFetch return value
interface UseFetchReturnType<T> {
  data: T[]
  error: null | unknown
  isLoading: boolean
  isError: boolean
}

/**
 * @useFetch - Custom hook (fetch data and cache data based on URL)
 * @param url {string}
 * @returns {data - response data []}
 * @returns {isLoading - boolean}
 * @returns {error - null | unknown}
 * @returns {isError - boolean}
 */

// Cache fetched data based on URL
const cache: Record<string, unknown> = {}

export const useFetch = <T>(url: string): UseFetchReturnType<T> => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | unknown>(null)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    try {
      if (cache[url]) {
        setData(cache[url] as T[])
      } else {
        setIsLoading(true)
        const response = await fetch(url)
        const responseData = await response.json()
        setData(responseData)
        // Cache response data with URL as the key
        cache[url] = responseData
      }
    } catch (error) {
      // Handle any errors that occur during fetching.
      setError(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    error,
    isLoading,
    isError
  }
}
