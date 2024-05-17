import { useState, useEffect, useCallback } from "react"

interface FetchOptions extends RequestInit {
  // Additional properties can be defined here if needed
}

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const useFetch = <T>(url: string, initialOptions?: FetchOptions): FetchState<T> & { execute: (data?: any) => void } => {
  console.log("useFetch", url)
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [options, setOptions] = useState<FetchOptions | undefined>(initialOptions)

  const execute = useCallback(
    async (body?: any) => {
      setLoading(true)
      setError(null)

      const fetchOptions = {
        ...options,
        body: body ? JSON.stringify(body) : undefined,
        // body: postData ? JSON.stringify(postData) : undefined,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      }

      try {
        const response = await fetch(url, fetchOptions)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const result: T = await response.json()
        setData(result)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [url, options],
  )

  useEffect(() => {
    if (options?.method === "GET" || !options?.method) {
      execute()
    }
  }, [url, options, execute])

  return { data, loading, error, execute }
}

export default useFetch
