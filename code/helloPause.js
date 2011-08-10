var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello\n');
  setTimeout(function() {
    res.end('World\n');
  }, 2000);
}).listen(3000);

console.log('Server running on port 3000');

setInterval(function() {
  console.log('foo');
}, 1500);

setInterval(function() {
  console.log('bar');
}, 3000);
