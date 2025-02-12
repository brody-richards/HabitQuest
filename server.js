const express = require('express');
const https = require('https');
const fs = require('fs');
const http = require('http');
const hsts = require('hsts');

const app = express();
const PORT_HTTP = 3000;
const PORT_HTTPS = 3443;

app.get('/', (req, res) => {
    res.send('HTTP Quest Tracker');
});

app.get('/secure', (req, res) => {
    res.send('HTTPS Quest Tracker');
});

app.get('/habits', (req, res) => {
    res.send('Daily, Weekly, Monthly, and Yearly Habits');
});

app.get('/goals', (req, res) => {
    res.send('Outline your goals');
});

app.get('/profile', (req, res) => {
    res.send('Personal Profile');
});

const hstsOptions = {
    maxAge: 31536000, 
    includeSubDomains: true, 
    preload: true 
};

http.createServer(app).listen(PORT_HTTP, () => {
    console.log(`HTTP Server running at http://localhost:${PORT_HTTP}`);
});

const options = {
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('certificate.pem'),
};

const httpsServer = https.createServer(options, (req, res) => {
    hsts(hstsOptions)(req, res, () => {
        app(req, res);
    });
});

httpsServer.listen(PORT_HTTPS, () => {
    console.log(`HTTPS Server running at https://localhost:${PORT_HTTPS}`);
});