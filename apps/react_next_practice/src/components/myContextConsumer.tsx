import React from "react"
import { useMyContextState, IState } from "../hook/myContextState"

interface Props {}

const Compo: React.FC<Props> = ({}) => {
  const { state, setState } = useMyContextState()
  return (
    <div>
      <div>{state.yee}</div>
      <div
        onClick={() => {
          setState((wstate: IState) => {
            return { ...wstate, yee: "yeeeeeeee" }
          })
        }}
      >
        ----click yeeeeeeee--
      </div>
    </div>
  )
}

export default Compo
