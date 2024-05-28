import { useState, useEffect } from "react"

/**
 * This suffer from double render. Ok but not ideal.
 * Not sure would native useOptimistic will fix this.
 */

export default function useMyV0Optimistic<T>(
  state: T,
  updateFn: (state: T, newMessage: any) => T,
): [T, (newMessage: any) => void] {
  const [optimisticState, setOptimisticState] = useState(state)

  useEffect(() => {
    // this is causing double render. Ok but not ideal.
    setOptimisticState(state)
  }, [state])

  const addOptimistic = (optimisticValue: any) => {
    setOptimisticState((currentState) => updateFn(currentState, optimisticValue))
  }

  return [optimisticState, addOptimistic]
}
