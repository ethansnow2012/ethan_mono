import { useRef, useEffect } from "react"
import { useIntersection } from "@/hook/useIntersection"

export default function IntersectionBox() {
  const ref = useRef(null)
  console.log("IntersectionBox", ref.current)
  const isIntersecting = useIntersection(ref)

  useEffect(() => {
    if (isIntersecting) {
      document.body.style.backgroundColor = "black"
      document.body.style.color = "white"
    } else {
      document.body.style.backgroundColor = "white"
      document.body.style.color = "black"
    }
  }, [isIntersecting])

  return (
    <div
      ref={ref}
      style={{
        margin: 20,
        height: 100,
        width: 100,
        border: "2px solid black",
        backgroundColor: "blue",
      }}
    />
  )
}
