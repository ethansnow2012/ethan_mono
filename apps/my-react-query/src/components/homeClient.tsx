"use client"
import React from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAction } from "next-safe-action/hooks"
import { fetchPosts, createPost } from "@/actions"

export default function HomeClient() {
  const queryClient = useQueryClient()

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => fetchPosts(),
  })

  const { execute: executeCreatePost } = useAction(createPost, {
    onSuccess: () => {
      //queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  console.log("posts", posts)

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts?.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      )}
      <button onClick={() => executeCreatePost({ title: "New Post", body: "New Post Body" })}>Create Post</button>
    </div>
  )
}
