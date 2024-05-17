
import * as http from 'http';
import { AppError, errorHandler } from './errorModule';


// Create a function to handle requests and potentially throw errors
const requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        if (req.url === '/error') {
            // Simulate an error condition
            throw new AppError('An error occurred!', 500);
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    } catch (error) {
        errorHandler(error as AppError, res);
    }
};



// Set up the HTTP server
const server = http.createServer(requestHandler);

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});