"use client"
import React, { useRef } from "react"
import useMyOptimistic from "@/hook/useMyOptimistic_best"

type Msg = { text: string }

const simulateServerResponse = (message: string, delay = 1000): Promise<{ text: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        alert("error occured. we should rollback")
        reject("error")
      } else {
        resolve({ text: message })
      }
    }, delay)
  })
}

const MyChat: React.FC = () => {
  console.log("MyChat")
  const inputRef = useRef<HTMLInputElement>(null)
  const [chatMsgs, setChatMsgsOptimistically, setChatMsgsReal, rollback] = useMyOptimistic<Msg[]>([
    { text: "Hello" },
    { text: "How are you?" },
  ])

  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const newMessage = { text: inputRef.current.value }

      setChatMsgsOptimistically((prev) => {
        //return [...prev, { text: inputRef.current.value }] // error: !! function has delegeted to the setter thus Ref.current will refer future value
        return [...prev!!, newMessage]
      })

      simulateServerResponse(inputRef.current.value)
        .then(({ text }) => {
          setChatMsgsReal((prev: Msg[]) => {
            return [...prev, { text: text + "(from server)" }]
          })
        })
        .catch((e) => {
          rollback()
        })
      inputRef.current.value = ""
    }
  }

  return (
    <div>
      <h1>My Chat</h1>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleSubmit}>Submit( with chance error)</button>
      </div>
      {chatMsgs.map((el: { text: string }, i: number) => (
        <li key={i}>{el.text}</li>
      ))}
    </div>
  )
}
export default MyChat
