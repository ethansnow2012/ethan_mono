import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { fetchPosts } from "@/actions"
import HomeClient from "@/components/homeClient"

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Posts</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeClient></HomeClient>
      </HydrationBoundary>
    </main>
  )
}
