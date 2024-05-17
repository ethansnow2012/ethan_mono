"use client"
import React, { useCallback } from "react"
import MyContextConsumer from "@/components/myContextConsumer"
import { MyContextStateProvider } from "@/hook/myContextState"

const PlayGround = () => {
  return (
    <div>
      <h1>PlayGround</h1>
      <MyContextStateProvider>
        <div>
          <MyContextConsumer></MyContextConsumer>
        </div>
      </MyContextStateProvider>
    </div>
  )
}

export default PlayGround
