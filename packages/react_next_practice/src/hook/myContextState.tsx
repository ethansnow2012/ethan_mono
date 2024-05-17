import { createContext, useState, useContext } from "react"

export type IState = {
  yee: string
}

type IMyContextState = {
  state: IState
  setState: React.Dispatch<React.SetStateAction<IState>>
}

const initialState: IState = { yee: "yee" }
const MyContextState = createContext<IMyContextState | null>(null)

const useMyContextState = () => {
  const context = useContext(MyContextState)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
const MyContextStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<IState>(initialState) //actual state
  return <MyContextState.Provider value={{ state, setState }}>{children}</MyContextState.Provider>
}

export { MyContextStateProvider, useMyContextState }
