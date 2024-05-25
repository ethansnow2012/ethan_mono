"use client"
import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"

export default function () {
  const dispatch = useDispatch()
  const textRef = useRef<HTMLInputElement>(null)
  const todos = useSelector((state: RootState) => state.todosSlice)

  useEffect(() => {
    dispatch({ type: "TODOS_FETCH_REQUESTED" })
  }, [])

  const onAdd = () => {
    dispatch({ type: "CREATE_TODO_REQUESTED", payload: textRef.current!.value })
    textRef.current!.value = ""
  }
  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  dispatch({ type: "UPDATE_TODO_REQUESTED", payload: { ...todo, done: !todo.done } })
                }}
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => dispatch({ type: "DELETE_TODO_REQUESTED", payload: { ...todo } })}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input type="text" ref={textRef} />
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  )
}
