import http2 from "http2"
import crypto from "crypto"
import path from "path"
import fs from "fs"

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
const privateKey = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Adjust the key length as needed
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
  fs.writeFileSync('key.pem', privateKey.privateKey);
  
  // Generate a self-signed certificate
  const certificate = `-----BEGIN CERTIFICATE-----
  [Your Certificate Data]
  -----END CERTIFICATE-----`;
  
  // Save the certificate to a file
  fs.writeFileSync('cert.pem', certificate);
// const http2 = require('http2');
// const  = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname, '../key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, '../cert.pem'), 'utf8')
});

server.on('stream', (stream, headers) => {
    console.log(stream)
    stream.respond({ ':status': 200, 'content-type': 'text/plain' });
    stream.end('Hello, HTTP/2 Server!');
});

server.listen(8443, () => {
    console.log('HTTP/2 server is listening on port 8443');
});
