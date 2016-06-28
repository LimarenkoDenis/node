const config = require('./config');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

http.createServer((request, response) => {
  let filePath = path.join('public', request.url);
  if (filePath === path.join('public/')) {
    filePath = path.join('public', 'index.html');
  }
  const extname = path.extname(filePath);
  const contentType = mime.contentType(extname);

  fs.exists(filePath, (exists) => {
    if (exists) {
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(response);
      readStream.on('end', () => {
        response.writeHead(200, { 'Content-Type': contentType });
      });
    } else {
      fs.readFile(path.join('public', '404.html'), (err, data) => {
        if (err) throw err;
        response.writeHead(404, { 'Content-Type': contentType });
        response.end(data);
      });
    }
  });
}).listen(config.get('port'));
console.log(`Server running at port ${config.get('port')}`);