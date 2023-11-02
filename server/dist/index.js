"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = __importDefault(require("http2"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
//create a server object:
http_1.default.createServer(function (req, res) {
    res.write('Hello World! http'); //write a response to the client
    res.end(); //end the response
}).listen(8442); //the server object listens on port 8080
// file: ./server.js
// // create a new server instance
// const server = http2.createServer()
// // log any error that occurs when running the server
// server.on('error', (err) => console.error(err))
// // the 'stream' callback is called when a new
// // stream is created. Or in other words, every time a
// // new request is received
// server.on('stream', (stream, headers) => {
//   // we can use the `respond` method to send
//   // any headers. Here, we send the status pseudo header
//   stream.respond({
//     ':status': 200
//   })
//   // response streams are also stream objects, so we can
//   // use `write` to send data, and `end` once we're done
//   stream.write('Hello World!')
//   stream.end()
// })
// // start the server on port 8000
// server.listen(8000)
// Create an unencrypted HTTP/2 server
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync('key.pem', "utf8"),
    cert: fs_1.default.readFileSync('cert.pem', "utf8"),
});
server.on('error', (err) => console.error(err));
server.on('stream', (stream, headers) => {
    console.log(stream);
    console.log(headers);
    // stream is a Duplex
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    });
    stream.end('<h1>Hello World</h1>');
});
server.listen(8443);
const client = http2_1.default.connect('http://localhost:8443');
