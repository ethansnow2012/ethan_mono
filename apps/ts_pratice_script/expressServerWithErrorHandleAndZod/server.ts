import express, { Request, Response, NextFunction, RequestHandler } from "express"
import { z, ZodError } from "zod"

// Define a custom Error class
class AppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

// Async handler wrapper
const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// Example schema for validating request data
const exampleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().positive("Age must be a positive integer"),
})

// Middleware for validating request body against the schema
const validate = (schema: z.ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await schema.safeParseAsync(req.body)
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message).join(", ")
      return next(new AppError(messages, 400))
    }
    next()
  } catch (err) {
    next(err)
  }
}

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Route with validation middleware
app.post(
  "/validate",
  validate(exampleSchema),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Data is valid!")
  }),
)

// Async route example using the asyncHandler wrapper
app.get(
  "/async-error",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await someAsyncFunction()
    res.send("This will not be reached if there is an error.")
  }),
)

// Example route that throws an error
app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("This is a custom error!", 400))
})

// Global error handling middleware
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

// Use the error handler
app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Example asynchronous function that throws an error
async function someAsyncFunction() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Async error occurred!"))
    }, 1000)
  })
}
