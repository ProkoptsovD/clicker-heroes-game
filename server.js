const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT ?? 8853;
const HOST = process.env.SERVER_URL ?? `http://localhost:${PORT}/`;

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt'
};

// Creating a server and listening at port 1800
const server = http.createServer((req, res) => {
  // Parsing the requested URL
  const parsedUrl = url.parse(req.url);

  if (parsedUrl.pathname === '/') {
    return fs.readFile(path.join(__dirname, '/index.html'), function (err, data) {
      if (err) {
        res.statusCode = 500;
        return res.end(`Error in getting the file.`);
      } else {
        // If the file is found, set Content-type
        // and send data
        res.setHeader('Content-type', mimeType['.html'] || 'text/plain');

        return res.end(data);
      }
    });
  }

  /* Processing the requested file pathname to
    avoid directory traversal like,
    http://localhost:1800/../fileOutofContext.txt
    by limiting to the current directory only. */
  const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

  let pathname = path.join(__dirname, sanitizePath);

  if (!fs.existsSync(pathname)) {
    // If the file is not found, return 404
    res.statusCode = 404;
    return res.end(`File ${pathname} not found!`);
  } else {
    // Read file from file system limit to
    // the current directory only.
    return fs.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500;
        return res.end(`Error in getting the file.`);
      } else {
        // Based on the URL path, extract the
        // file extension. Ex .js, .doc, ...
        const ext = path.parse(pathname).ext;

        // If the file is found, set Content-type
        // and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain');

        return res.end(data);
      }
    });
  }
});
server.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `⚡⚡⚡ Server is running on port: ${PORT} ⚡⚡⚡`);
  console.log(`\x1b[34mServer hosting on the address: \x1b[35m\x1b[4m${HOST}`);
});
