const express = require('express');
const fs = require('fs');
const path = require('path');
const { virusTotalFetchData } = require('./function');

const app = express();
const port = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root path
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).type('text/html').send(ipAddress);
        }
    });
});

// Route for '/virustotal'
app.get('/virustotal', (req, res) => {
    const ipAddress = req.query.inputName
    console.log(ipAddress)
    virusTotalFetchData(ipAddress);
    res.send('ipAddress received successfully')
});

// 404 Not Found handler
// app.use((req, res) => {
//     res.status(404).send('Not Found');
// });

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
