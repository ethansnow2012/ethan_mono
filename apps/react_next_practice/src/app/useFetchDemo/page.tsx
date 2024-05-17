"use client"
import type { AppProps } from "next/app"
import { useMemo } from "react"
import useFetch from "@/hook/useFetch"

interface PostItem {
  userId: number
  id: number
  title: string
  body: string
}
interface FetchOptions extends RequestInit {
  // Additional properties can be defined here if needed
}

export default function Page({ Component, pageProps }: AppProps) {
  const { data, loading, error } = useFetch<PostItem[]>("https://jsonplaceholder.typicode.com/posts")
  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useFetch<PostItem[]>("https://jsonplaceholder.typicode.com/posts")
  type FetchOptions = RequestInit
  const postOption = useMemo<FetchOptions>(() => {
    return {
      method: "POST",
    }
  }, [])

  const {
    data: dataPost,
    loading: loadingPost,
    error: errorPost,
    execute: executePost,
  } = useFetch<{ id: number }>("https://jsonplaceholder.typicode.com/posts", postOption)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <div>
        <h2>Fetch(Get)</h2>
        <ul>
          {data
            ?.filter((x, ii) => ii < 5)
            .map((item) => (
              <li key={item.id}>{"-- " + item.title}</li>
            ))}
        </ul>
      </div>
      <div>
        <h2 onClick={() => executePost()}>Fetch(Post) Click Me</h2>
        {loadingPost && <div>Loading...</div>}
        <div>{dataPost?.id && <div>Post Id: {dataPost.id}</div>}</div>
      </div>
    </div>
  )
}
