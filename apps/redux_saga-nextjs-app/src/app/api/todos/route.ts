import { NextRequest, NextResponse } from "next/server"
import type { Todo } from "@/types"
import { db } from "@/data/todoDb"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const reqGuard = ({ req, todo, id }: { req: NextRequest; todo?: Todo; id?: number }) => {
  if (!todo || !id) {
    return () =>
      new NextResponse(JSON.stringify({ error: "Missing params." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
  }
  if (id !== todo.id) {
    return () =>
      new NextResponse(JSON.stringify({ error: "Unauthed op." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
  }
  return null
}

export async function GET() {
  return NextResponse.json(db.todos)
}

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  const newTodo: Todo = {
    id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
    text,
    active: true,
    done: false,
  }
  db.todos.push(newTodo)
  await sleep(500) // mimic lag
  return NextResponse.json(newTodo, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get("id") as string, 10)
  const updatedTodo = (await req.json()) as Todo

  const guardedError = reqGuard({ req, todo: updatedTodo, id })
  if (guardedError) return guardedError()

  await sleep(500) // mimic lag

  if (Math.random() < 0.25) {
    return new NextResponse(JSON.stringify({ error: "Bad luck. :)" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  db.todos = db.todos.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
  return NextResponse.json(updatedTodo)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get("id") as string, 10)
  const todoToDelete = (await req.json()) as Todo

  const guardedError = reqGuard({ req, todo: todoToDelete, id })
  if (guardedError) return guardedError()

  db.todos = db.todos.filter((todo) => todo.id !== id)
  return NextResponse.json(todoToDelete)
}
