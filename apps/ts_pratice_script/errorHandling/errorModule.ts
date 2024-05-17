import { type ServerResponse } from 'http';

export class AppError extends Error {
    public statusCode: number;
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

// Asynchronous logger function
async function logError(error: Error): Promise<void> {
    // Simulate an async operation, like writing to a file or a database
    return new Promise((resolve) => {
        console.error(`Error logged: ${error.message}`);
        if (error instanceof AppError) {
            console.error(`Status Code: ${error.statusCode}`);
        }
        resolve();
    });
}

// Define an error handler function to centralize error management
export const errorHandler = async (error: Error, res: ServerResponse) => {
    await logError(error);  // Wait for the log to complete

    if (error instanceof AppError) {
        res.writeHead(error.statusCode, { 'Content-Type': 'text/plain' });
        res.end(error.message);
    } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('An unexpected error occurred.');
    }
};