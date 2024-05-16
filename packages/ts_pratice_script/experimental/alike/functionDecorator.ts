// 定義高階函數作為裝飾器

const myLogExecutionTime2 = function <T extends (...args: any[]) => any>(fn: T): T {
  return function (...args: Parameters<T>): ReturnType<T> {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()
    console.log(`${fn.name} executed in ${end - start}ms`)
    return result
  } as T
}

// 純函數範例
function add(a: number, b: number): number {
  let sum = a + b
  for (let i = 0; i < 1000000000; i++) {} // 模擬一些延遲
  return sum
}

// 使用高階函數裝飾純函數
const decoratedAdd = myLogExecutionTime2(add)

// 使用範例
console.log(decoratedAdd(2, 3))
