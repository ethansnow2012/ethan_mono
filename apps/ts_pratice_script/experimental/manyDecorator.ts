// /Decorator.ts
import "reflect-metadata"
// 類別裝飾器 type 1: 封裝
const sealed: ClassDecorator = (target) => {
  Object.seal(target)
  Object.seal(target.prototype)
}
// 類別裝飾器 type 2: 複寫 constructor 並加上新的方法
function trackInstances<T extends { new (...args: any[]): {} }>(constructor: T) {
  let instanceCount = 0

  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      instanceCount++
      console.log("Instance count: ", instanceCount)
    }

    randomConsole() {
      console.log("randomConsole")
    }

    static getInstanceCount() {
      return instanceCount
    }
  }
}

// 屬性裝飾器 overwrite getter and setter
const format = function (formatString: string): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    let value: string
    const getter = function () {
      return value
    }
    const setter = function (newVal: string) {
      value = `${formatString} ${newVal}`
    }
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

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

const requiredMetadataKey = Symbol("required")

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  existingRequiredParameters.push(parameterIndex)
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey)
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
  let method = descriptor.value!

  descriptor.value = function (...args: any[]) {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName)
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= args.length || args[parameterIndex] === undefined) {
          throw new Error("Missing required argument.")
        }
      }
    }
    return method.apply(this, args)
  }
}

@sealed
@trackInstances
class Example {
  @format("Mr.")
  name: string

  constructor(name: string) {
    this.name = name
  }

  @methodLogExecutionTime
  @validate
  greet(@required message: string): string {
    return `Hello, ${message}`
  }
}

const example = new Example("John Doe")
console.log(example.name) // Output: Mr. John Doe
console.log(example.greet("World")) // Output: greet executed in Xms

console.log("--------")
try {
  // @ts-ignore
  example.greet()
} catch (error) {
  console.log("error caught") // Output: Missing required argument.
}
console.log("--------")
const example2 = new Example("Jon Snow")
console.log(Example as any)
;(example2 as typeof example2 & { randomConsole: () => void }).randomConsole()
