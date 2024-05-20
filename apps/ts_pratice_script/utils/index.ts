const wrapPromiseV1 = <T>(promise: Promise<T>) => {
  return Promise.allSettled([promise]).then(([result]) => {
    return result.status === "fulfilled" ? { value: result.value } : { error: result.reason }
  })
}

const wrapPromiseV2 = async <T>(promiseFc: () => Promise<T>) => {
  return Promise.allSettled([promiseFc()]).then(([result]) => {
    return result.status === "fulfilled" ? { value: result.value } : { error: result.reason }
  })
}

// Example usage:
const testFunction1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Test result")
    }, 1000)
  })
}
const testFunction2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Reject result")
    }, 1000)
  })
}
const testFunction3 = async () => {
  throw new Error("Test error")
}
const testFunction4 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // setTimeout will go beyond the context of being caught catch
      try {
        // try block will catch the error then we can explicitly reject the error
        throw new Error("Test error")
      } catch (error) {
        reject(error)
      }
    }, 1000)
  })
}
const testFunction5 = () => {
  return new Promise((resolve, reject) => {
    testFunction3() // this will throw an error beyond the context of being caught catch
  })
}
//========== as a bad practice !!!!!!!!
const testFunction6 = () => {
  // this kind of promise should be considered as a bad practice
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      throw new Error("Test error")
    }, 1000)
  })
}
wrapPromiseV2(testFunction1).then((result) => {
  console.log("Result from wrapPromiseV2(testFunction1)", result)
})
wrapPromiseV2(testFunction2).then((result) => {
  console.log("Result from wrapPromiseV2(testFunction2)", result)
})
;(async () => {
  const { error } = await wrapPromiseV2(testFunction3)
  console.log(error.message)

  const { error: error2 } = await wrapPromiseV1(testFunction3())
  console.log(error2.message)

  const { error: error3 } = await wrapPromiseV2(testFunction4)
  console.log("error3", error3.message)

  const { error: error4 } = await wrapPromiseV1(testFunction4())
  console.log("error4", error4.message)

  //   const { error: error5 } = await wrapPromiseV1(testFunction5())
  //   console.log("error5", error5.message)
  process.on("unhandledRejection", (...args) => {
    console.log("Caught unhandled rejection:", args)
  })
  process.on("uncaughtException", (...args) => {
    console.log("Caught unhandled exception:", args)
  })
  try {
    testFunction6()
      .then(() => {
        console.log("@@ will not happen 1")
      })
      .catch((error) => {
        console.log("@@ will not happen 2")
      })
  } catch (error) {
    console.log("@@ will not happen 3")
  }
})()
