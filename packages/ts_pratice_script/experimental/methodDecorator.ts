// /methodDecorator.ts
const methodLogExecutionTime: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    const start = performance.now()
    const result = originalMethod.apply(this, args)
    const end = performance.now()
    console.log(`${String(propertyKey)} executed in ${end - start}ms`)
    return result
  }

  return descriptor
}

class Calculator {
  @methodLogExecutionTime
  add(a: number, b: number): number {
    let sum = a + b
    for (let i = 0; i < 1000000000; i++) {} // 模擬一些延遲
    return sum
  }
}

const calculator = new Calculator()
calculator.add(2, 3)
