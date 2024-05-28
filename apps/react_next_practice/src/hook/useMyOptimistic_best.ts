import { useState } from "react"

const useMyOptimistic = <T>(
  defaultState: T,
): [T, React.Dispatch<React.SetStateAction<T | null>>, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const [state, setState] = useState(defaultState)
  const [optimisticState, setOptimisticState] = useState<T | null>(null)

  type setterInput = Parameters<React.Dispatch<React.SetStateAction<T>>>[0]
  type opSetterInput = Parameters<React.Dispatch<React.SetStateAction<T | null>>>[0]

  const updateOptimistically = (action: opSetterInput) => {
    if (optimisticState === null) {
      setOptimisticState(() => {
        const newState = typeof action === "function" ? (action as (prevState: T) => T)(state) : null
        if (newState === null) {
          throw new Error("updateOptimistically must use a function setter to sync actual state")
        }
        return newState
      })
    } else {
      setOptimisticState(action)
    }
  }
  const updateReal = (action: setterInput) => {
    setOptimisticState(null)
    setState(action)
  }
  const rollBack = () => {
    setOptimisticState(null)
  }

  return [optimisticState ? optimisticState : state, updateOptimistically, updateReal, rollBack]
}

export default useMyOptimistic
