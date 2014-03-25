
var http = require('http');
var fs = require('fs');
var streamHash = require('./streamHash');


var app = function(req, res) {

  if(req.url === '/get_hash') {
    streamHash(req, function(err, hash) {
      if(err) {
        res.statusCode = 500;
        res.end(err.stack);
      } else {
        res.statusCode = 200;
        res.end(hash);
      }
    });
    req.resume();
  } else if(req.url === '/199') {
    res.statusCode = 199;
    res.end('199');
  } else if(req.url === '/300') {
    res.statusCode = 300;
    res.end('300');
  } else {

    var path = __dirname + '/assets' + req.url;

    fs.exists(path, function(exists) {
      if(exists) {
        fs.createReadStream(path).pipe(res);
      } else {
        res.statusCode = 404;
        res.end('Unknown Path');
      }
    });

  }

}

module.exports = http.createServer(app);