"use server"

import { posts } from "@/data"
import { createSafeActionClient } from "next-safe-action"
import * as z from "zod"
import { createPostSchema } from "@/schema"

const actionClient = createSafeActionClient()

export const fetchPosts = async () => {
  return posts
}
// export const createPost = actionClient(createPoseSchema, async (post: z.infer<typeof createPoseSchema>) => {
//   posts.push({ id: posts.length + 1, ...post })
// })

export const createPost = actionClient(createPostSchema, async (post: z.infer<typeof createPostSchema>) => {
  const newPost = { id: posts.length + 1, ...post }
  posts.push(newPost)
  return { success: true, post: newPost }
})
