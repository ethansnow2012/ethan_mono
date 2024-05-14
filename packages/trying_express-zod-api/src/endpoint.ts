import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { authMiddleware } from "./middleware";


export const helloWorldEndpoint = defaultEndpointsFactory.build({
  method: "get", 
  input: z.object({
    name: z.string().optional(),
  }),
  output: z.object({
    greetings: z.string(),
  }),
  handler: async ({ input: { name }, options, logger }) => {
    logger.debug("Options:", options); // middlewares provide options
    return { greetings: `Hello, ${name || "World"}. Happy coding!` };
  },
});

export const authNeededEndpoint = defaultEndpointsFactory.addMiddleware(authMiddleware).build({
    method: "get",
    input: z.object({
        key: z.string().min(1),
    }),
    output: z.object({}),
    handler: async ({ input: { key }, options, logger }) => {
        logger.debug("Options:", options); // middlewares provide options
        return { greetings: `Hello, ${key}. Valid!` };
      },
})

export const justThrowError = defaultEndpointsFactory.build({
    method: "get",
    input: z.object({}),
    output: z.object({}),
    handler: async () => {
        throw new Error("This is an error")
    },
})

