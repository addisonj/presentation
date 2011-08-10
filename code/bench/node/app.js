var http = require('http'),
CONFIG = require('./config'),
Client = require('mysql').Client,
fs = require('fs'),
client = new Client(CONFIG),
TEST_DB = 'node_bench',
TEST_TABLE = 'test',
count = 0,
data;

client.connect();

function readFile(cb) {
  fs.readFile('./data', function(err, d) {
    if (err) return cb(err);
    cb(err, d);
  });
}

function insert(cb) {
  client.query(
  'INSERT INTO ' + TEST_TABLE + ' ' +
  'SET title = ?, text = ?',
  ['TEST' + count++, Math.random()], function(err) {
    if (err) return cb(err);
    readFile(cb);
  });
}

function makeTable(cb) {
  client.query(
    'CREATE TEMPORARY TABLE IF NOT EXISTS '+  TEST_TABLE+
    ' (id INT(11) AUTO_INCREMENT, '+
    'title VARCHAR(255), '+
    'text TEXT, '+
    'PRIMARY KEY (id))', 
    function(err) {
      if(err) return cb(err);
      insert(cb);
    });
}

function use(cb) {
  client.query('USE ' + TEST_DB, function(err) {
    if (err) return cb(err);
    makeTable(cb);
  });
}

function makeDB(cb) {
  client.query('CREATE DATABASE IF NOT EXISTS ' + TEST_DB, function(err) {
    if (err) return cb(err);
    use(cb);
  });
}

function doBench(cb) {
  makeDB(cb);
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  doBench(function(err, d) {
    if (err) throw new Error('something went wrong: ' +  err );
    res.end('Hello World');
  });
}).listen(3000);
console.log('Server running on port 3000');
