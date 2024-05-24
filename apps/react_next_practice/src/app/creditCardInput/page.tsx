"use client"
import { UserProvider } from "@/hook/myContext"
import ContextCustom from "@/components/contextCustom"

import React, { useState, useRef, type ChangeEvent, type FormEvent } from "react"

const CreditCardInput: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<{ part1: string; part2: string; part3: string }>({
    part1: "",
    part2: "",
    part3: "",
  })

  const part1Ref = useRef<HTMLInputElement>(null)
  const part2Ref = useRef<HTMLInputElement>(null)
  const part3Ref = useRef<HTMLInputElement>(null)

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = value.replace(/[^\d]/g, "").slice(0, 4)

    setCardNumber((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    if (formattedValue.length === 4) {
      if (name === "part1") {
        part2Ref.current?.focus()
      } else if (name === "part2") {
        part3Ref.current?.focus()
      }
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Card Number:</label>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="text"
            name="part1"
            value={cardNumber.part1}
            onChange={handleCardNumberChange}
            placeholder="1234"
            maxLength={4}
            ref={part1Ref}
          />
          <input
            type="text"
            name="part2"
            value={cardNumber.part2}
            onChange={handleCardNumberChange}
            placeholder="5678"
            maxLength={4}
            ref={part2Ref}
          />
          <input
            type="text"
            name="part3"
            value={cardNumber.part3}
            onChange={handleCardNumberChange}
            placeholder="9012"
            maxLength={4}
            ref={part3Ref}
          />
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default CreditCardInput
