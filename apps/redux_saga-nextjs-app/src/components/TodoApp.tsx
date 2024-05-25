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
      {/* <div className="filter"></div> */}
      <div className="border-solid border-2 border-indigo-600 w-[375px] todos">
        {todos?.map((todo) => (
          <div key={todo.id} className="flex">
            <div className="mr-auto">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  dispatch({
                    type: "UPDATE_TODO_REQUESTED",
                    payload: { target: { ...todo, done: !todo.done }, og: { ...todo } },
                  })
                }}
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => dispatch({ type: "DELETE_TODO_REQUESTED", payload: { ...todo } })}>Delete</button>
          </div>
        ))}
      </div>
      <div className="add">
        <input type="text" ref={textRef} />
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  )
}
