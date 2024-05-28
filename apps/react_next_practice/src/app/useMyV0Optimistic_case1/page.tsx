"use client"
import React, { useRef, useState } from "react"
import useMyV0Optimistic from "@/hook/myV0Optimistic"

interface Message {
  text: string
  sending?: boolean
}

interface ThreadProps {
  messages: Message[]
  sendMessage: (formData: FormData) => Promise<void>
}

const Page: React.FC = () => {
  console.log("R Page")
  const formRef = useRef<HTMLFormElement>(null)
  const [messages, setMessages] = useState<Message[]>([{ text: "Hello there!", sending: false }])

  async function sendMessage(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get("message") as string)
    console.log("sendedMessage", sentMessage)
    setMessages((messages) => [...messages, { text: sentMessage }])
  }
  
  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message") as string)
    formRef.current?.reset()
    await sendMessage(formData)
  }

  const [optimisticMessages, addOptimisticMessage] = useMyV0Optimistic<Message[]>(messages, (state, newMessage) => [
    ...state,
    {
      text: newMessage,
      sending: true,
    },
  ])

  return (
    <div>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formAction(new FormData(formRef.current!))
        }}
        ref={formRef}
      >
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Page

// Mocked deliverMessage function for completeness
async function deliverMessage(message: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message)
    }, 2000)
  })
}
