
var crypto = require('crypto');

module.exports = function streamHash(stream, cb) {

  var hash = crypto.createHash('md5');

  stream.on('data', function(data) {
    hash.update(data);
  });

  stream.on('end', function() {
    cb(null, hash.digest('hex'));
  });

}