import { NextApiRequest, NextApiResponse } from "next"
import { createPostSchema } from "@/schema"

const posts = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const post = createPostSchema.parse(req.body)
      const newPost = { id: posts.length + 1, ...post }
      posts.push(newPost)
      return res.status(200).json({ success: true, post: newPost })
    } catch (error) {
      return res.status(400).json({ success: false, error: "error.message" })
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }
}
