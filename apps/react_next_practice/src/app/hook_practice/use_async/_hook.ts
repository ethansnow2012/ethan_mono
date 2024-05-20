import { useEffect, useState } from "react"

export const useAsync = <T>(theTask: () => PromiseLike<T>) => {
  const [state, setState] = useState<T | null>(null)
  useEffect(() => {
    theTask().then((result) => {
      setState(result)
    })
  }, [])
  return state
}
