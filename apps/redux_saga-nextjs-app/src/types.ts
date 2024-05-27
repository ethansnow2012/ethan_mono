import type { TypedResponse as _TypedResponse } from "./apiActions/index"
export interface Todo {
  id: number
  text: string
  active: boolean
  done: boolean
}

export type TypedResponse<T> = _TypedResponse<T>

export type ChatObj = { msg: string }
