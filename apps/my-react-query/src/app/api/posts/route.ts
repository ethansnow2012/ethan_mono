import { NextRequest, NextResponse } from "next/server"
import { posts } from "@/data"

export async function POST(req: NextRequest) {
  const post = await req.json()
  posts.push({ id: posts.length + 1, ...post })
  return new NextResponse(JSON.stringify({ success: true, post: posts }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
