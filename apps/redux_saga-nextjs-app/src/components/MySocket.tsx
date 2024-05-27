"use client"
import React, { use, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { v4 as uuidv4 } from "uuid"

export default function () {
  const msgInputRef = useRef<HTMLInputElement>(null)
  const isConnected = useSelector((state: RootState) => state.socketSlice.connected)
  const chatMessages = useSelector((state: RootState) => state.socketSlice.chatMessages)
  const id = uuidv4()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "SOCKET_CONNECT_REQUESTED" })
    return () => {
      dispatch({ type: "SOCKET_DISCONNECT_REQUESTED" })
    }
  }, [])
  const handleSendMessage = () => {
    if (isConnected && msgInputRef.current && msgInputRef.current.value.trim() !== "") {
      dispatch({ type: "SEND_MESSAGE_REQUESTED", payload: msgInputRef.current.value })
      msgInputRef.current.value = ""
    }
  }
  return (
    <div>
      <div>This is socket page.</div>
      <div> Is connected: {isConnected ? "true" : "false"}</div>
      <div>
        <input type="text" ref={msgInputRef} />
        <button onClick={() => handleSendMessage()}>Send Message</button>
        <div>
          {chatMessages.map((el, i) => {
            return <div key={id + i}>{el.msg}</div>
          })}
        </div>
      </div>
    </div>
  )
}
