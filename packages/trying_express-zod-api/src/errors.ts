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