function runGenerator(genFn: () => Generator<any, any, any>) {
  const iterator = genFn()

  function handle(result: IteratorResult<any, any>): Promise<any> {
    if (result.done) return Promise.resolve(result.value)

    const value = result.value
    if (value instanceof Promise) {
      // run recursively
      return value.then((res) => handle(iterator.next(res))).catch((err) => handle(iterator.throw(err)))
    } else {
      return handle(iterator.next(value))
    }
  }

  try {
    return handle(iterator.next())
  } catch (ex) {
    return Promise.reject(ex)
  }
}

// Example usage with a generator function that yields promises
function* myGenerator() {
  try {
    const data1: Record<string, string> = yield fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
      res.json(),
    )
    console.log("Data 1:", data1)

    const data2: Record<string, string> = yield fetch("https://jsonplaceholder.typicode.com/todos/2").then((res) =>
      res.json(),
    )
    console.log("Data 2:", data2)

    return "All done!"
  } catch (error) {
    console.error("Error:", error)
    return "Failed"
  }
}
function* myGenerator2() {
  throw new Error("oh")
}

console.log("Time: A")
// Run the generator function in micor-task. :)
runGenerator(myGenerator)
  .then((result: Record<string, string>) => {
    console.log("Generator finished with result:", result)
  })
  .catch((error) => {
    console.log("runner cache 1")
  })
console.log("Time: B")

runGenerator(myGenerator2).catch((error) => {
  console.log("runner cache 2")
})
