const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    // Check if the requested URL is for the root path
    if (req.url === '/') {
        // Read the content of index.html file
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                // If there's an error reading the file, respond with 500 Internal Server Error
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                // If file is read successfully, respond with 200 OK and the file content
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else {
        // If the requested URL is not the root path, respond with 404 Not Found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
