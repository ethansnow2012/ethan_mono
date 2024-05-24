"use client"
import React, { useEffect, useRef, useCallback } from "react"
import { Provider, useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store"
import { toggleTodo, addTodo, fetchTodos } from "../store/todosSlice" //store, selectTodos, fetchTodos,removeTodo,
//import { store } from "@/store"

export default function () {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todosSlice)

  useEffect(() => {
    dispatch({ type: "TODOS_FETCH_REQUESTED" }) //fetchTodos()
  }, [dispatch])

  const textRef = useRef<HTMLInputElement>(null)
  const onAdd = useCallback(() => {
    dispatch(
      addTodo({
        id: Date.now(),
        text: textRef.current!.value,
        done: false,
        active: true,
      }),
    )
    textRef.current!.value = ""
  }, [dispatch])

  return (
    <div className="App">
      <div className="todos">
        {/* {JSON.stringify(state)} */}
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              {/* <input type="checkbox" checked={todo.done} /> */}
              {/* onChange={() => dispatch(toggleTodo(todo))} */}
              <span>{todo.text}</span>
            </div>
            {/* <button onClick={() => dispatch(removeTodo(todo))}>Delete</button> */}
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
