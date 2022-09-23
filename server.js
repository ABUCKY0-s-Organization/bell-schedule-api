const http = require('http');
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;
/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

var express = require('express'),
    app = express();
app.use(express.static(__dirname + '/public'));
app.listen(port);