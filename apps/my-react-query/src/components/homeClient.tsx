"use client"
import React from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useAction } from "next-safe-action/hooks"
import { fetchPosts, createPost } from "@/actions/serverAction"
import { createPostFromClient } from "@/actions/clientAction"

export default function HomeClient() {
  const queryClient = useQueryClient()

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => fetchPosts(),
  })

  const { execute: executeCreatePost } = useAction(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const { mutate: mutateFromClient} = useMutation({
    mutationFn: createPostFromClient,
    onSuccess: () => {
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
      <button onClick={()=>mutateFromClient(
        { title: "New Post", body: "New Post Body" },
        { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }) }
      )}>Create Post(mutationFromClient)</button>
    </div>
  )
}
