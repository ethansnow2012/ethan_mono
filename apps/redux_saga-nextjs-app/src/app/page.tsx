import React, { useEffect, useRef, useCallback } from "react"
import { Provider, useSelector, useDispatch } from "react-redux"
//import { store, selectTodos, fetchTodos, toggleTodo, removeTodo, addTodo } from "../store"
import TodoApp from "@/components/TodoApp"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoApp />
    </main>
  )
}
