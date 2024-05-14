import createHttpError from "http-errors";

export function notFound(message = 'Not Found') {
    return createHttpError(404, message);
}

export function unauthorized(message = 'Unauthorized') {
    return createHttpError(401, message);
}

export function internalServerError(message = 'Internal Server Error') {
    return createHttpError(500, message);
}

export function invalidKey(message = 'Invalid key') {
    return createHttpError(401, "");
}

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
export const withErrorHandleWrapper = combineDecorators(withEmailAlert, withErrorLogging);