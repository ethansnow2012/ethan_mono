import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';

const hostname: string = '127.0.0.1';
const port: number = 3000;

function throttledWrite({readStream, delay, fn}) {
    return function(chunk) {
        readStream.pause(); // Pause reading from the stream
        setTimeout(() => {
            fn(chunk);
            readStream.resume(); 
        }, delay);
    };
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'streamIndex.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error loading the HTML file.');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } else if (req.url === '/stream') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // Stream the contents of the file to the client
        const filePath = path.join(__dirname, 'streamDataIn.txt');
        const readStream = fs.createReadStream(filePath, { encoding: 'utf-8', highWaterMark: 4 });

        readStream.on('data', throttledWrite({fn:(chunk) => {
            res.write(`data: ${chunk}\n\n`);
        }, readStream, delay: 500} ));

        readStream.on('end', () => {
            console.log('Stream ends.');
            res.write('event: close\n');
            res.write('data: Stream ends.\n\n');
            res.end();
        });

        readStream.on('error', (error) => {
            console.error('Error reading file:', error);
            res.write('data: Error reading file\n\n');
            res.end();
        });


        req.on('close', () => {
            readStream.destroy();
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

