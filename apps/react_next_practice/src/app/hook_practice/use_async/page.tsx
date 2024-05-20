"use client"
import React, { useEffect, useState } from "react"
import { useAsync } from "./_hook"

type Msg = { msg: string }

const aAsyncFunction =  () => {
  return new Promise<Msg>((resolve) => {
    setTimeout(() => {
      resolve({ msg: "This is the task" })
    }, 3000)
  })
}
const Page = () => {
  const state = useAsync(aAsyncFunction)

  return <div>{JSON.stringify(state)}</div>
}

export default Page
