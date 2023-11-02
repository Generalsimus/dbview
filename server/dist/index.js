"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = __importDefault(require("http2"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// const crypto = require('crypto');
// const fs = require('fs');
// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
// });
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem'
//     },
//     privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem',
//     }
// });
// Generate a new RSA private key
const privateKey = crypto_1.default.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});
// Save the private key to a file
fs_1.default.writeFileSync('key.pem', privateKey.privateKey);
// Generate a self-signed certificate
const certificate = `-----BEGIN CERTIFICATE-----
  [Your Certificate Data]
  -----END CERTIFICATE-----`;
// Save the certificate to a file
fs_1.default.writeFileSync('cert.pem', certificate);
// const http2 = require('http2');
// const  = require('fs');
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, '../key.pem'), 'utf8'),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '../cert.pem'), 'utf8')
});
server.on('stream', (stream, headers) => {
    console.log(stream);
    stream.respond({ ':status': 200, 'content-type': 'text/plain' });
    stream.end('Hello, HTTP/2 Server!');
});
server.listen(8443, () => {
    console.log('HTTP/2 server is listening on port 8443');
});
