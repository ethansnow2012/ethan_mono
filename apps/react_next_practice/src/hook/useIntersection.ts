import { useEffect, useState, RefObject } from "react"

export function useIntersection(ref: RefObject<HTMLElement>): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)
  console.log("useIntersection", ref.current)
  useEffect(() => {
    console.log("useIntersection effect", ref.current)
    const div = ref.current
    if (!div) return // this will not be invoked!!

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 1.0,
      },
    )

    observer.observe(div)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}
