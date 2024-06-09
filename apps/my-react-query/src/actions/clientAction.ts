import { createPostSchema } from "@/schema"
import { z } from "zod"

export async function createPostFromClient(post: z.infer<typeof createPostSchema>) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong")
  }

  return data
}
