import { NextRequest, NextResponse } from "next/server"

interface Todo {
  id: number
  text: string
  active: boolean
  done: boolean
}

let todos: Todo[] = [{ id: 2, text: "Learn React(from api)", done: true, active: true }]

export async function GET() {
  return NextResponse.json(todos)
}

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  const newTodo: Todo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    text,
    active: true,
    done: false,
  }
  todos.push(newTodo)
  return NextResponse.json(newTodo, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const updatedTodo = (await req.json()) as Todo
  todos = todos.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
  return NextResponse.json(updatedTodo)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const todoToDelete = todos.find((todo) => todo.id === id)
  todos = todos.filter((todo) => todo.id !== id)
  return NextResponse.json(todoToDelete)
}
