"use client"
import React, { useReducer } from "react"
import MyContextConsumer from "@/components/myContextConsumer"
import { MyContextStateProvider } from "@/hook/myContextState"
import { reducer, getInitialState } from "@/hook/myReducerSchema"

const PlayGround = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  return (
    <div>
      <h1>PlayGround</h1>
      <div>
        <h2>useContext</h2>
        <MyContextStateProvider>
          <div>
            <MyContextConsumer></MyContextConsumer>
          </div>
        </MyContextStateProvider>
      </div>
      <div>
        <h2>useReducer</h2>
        <div>anya: {state.anya}</div>
        <div onClick={() => dispatch({ type: "ANYA_SAYS" })}>dispatch:"ANYA_SAYS"</div>
        <div onClick={() => dispatch({ type: "ANYA_WAKO" })}>dispatch:"Wako_Wako"</div>
      </div>
    </div>
  )
}

export default PlayGround
