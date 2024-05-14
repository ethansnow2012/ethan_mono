import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { authMiddleware } from "./middleware";

type HandlerType = (args: any) => Promise<any>;

function combineDecorators(...decorators: Array<(handler: HandlerType) => HandlerType>) {
    return function(handler: HandlerType) {
        return decorators.reduce((wrapped, decorator) => decorator(wrapped), handler);
    };
}

function withErrorLogging(handler: HandlerType) {
    return async function(args: any) {
        try {
            return await handler(args);
        } catch (error) {
            console.log(`Error in handler:`, error);
            // Optionally, you could handle the error further, e.g., by throwing a specific HTTP error.
            throw error; // rethrow the error if you want calling code to handle it as well.
        }
    };
}
function withEmailAlert(handler: HandlerType) {
    return async function(args: any) {
        try {
            return await handler(args);
        } catch (error) {
            console.log(`Pretending to send email...`);
            throw error; // rethrow the error if you want calling code to handle it as well.
        }
    };
}


// Using the compose function
const withErrorHandleWrapper = combineDecorators(withEmailAlert, withErrorLogging);

export const helloWorldEndpoint = defaultEndpointsFactory.build({
  method: "get", 
  input: z.object({
    name: z.string().optional(),
  }),
  output: z.object({
    greetings: z.string(),
  }),
  handler: withErrorHandleWrapper(async ({ input: { name }, options, logger }) => {
    logger.debug("Options:", options); // middlewares provide options
    return { greetings: `Hello, ${name || "World"}. Happy coding!` };
  }),
});

export const authNeededEndpoint = defaultEndpointsFactory.addMiddleware(authMiddleware).build({
    method: "get",
    input: z.object({
        key: z.string().min(1),
    }),
    output: z.object({}),
    handler: withErrorHandleWrapper(async ({ input: { key }, options, logger }) => {
        logger.debug("Options:", options); // middlewares provide options
        return { greetings: `Hello, ${key}. Valid!` };
      }),
})

export const justThrowError = defaultEndpointsFactory.build({
    method: "get",
    input: z.object({}),
    output: z.object({}),
    handler: withErrorHandleWrapper(async () => {
        throw new Error("This is an error")
    }),
})

