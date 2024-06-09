import * as z from "zod"
export const createPostSchema = z.object({ title: z.string(), body: z.string() })
