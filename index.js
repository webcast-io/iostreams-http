'use strict';

//
// Module Dependencies
//

var http = require('http');

//
// Opens a stream from wherever the destined input is
// @param  {Object}   config
// @param  {Function} callback (err, inputStream)
// @return {Void}
//
var getInputStream = function(config, callback) {

  config.method = config.method || 'GET';

  var req = http.request(config);

  req.on('error', function(err) {
    callback(err);
  });

  req.on('response', function(res) {
    if(res.statusCode >= 200 && res.statusCode < 300) {
      callback(null, res);
    } else {
      callback(new Error('Non 2xx statusCode: ' + res.statusCode), res);
    }
  });

  req.end();

};

//
// Opens a stream to wherever the destined output is
// @param  {Object}   config
// @param  {Function} callback (err, outputStream)
// @return {Void}
//
var getOutputStream = function(config, callback) {

  config.method = config.method || 'PUT';

  var req = http.request(config);

  req.on('error', function(err) {
    callback(err);
  });

  req.on('response', function(res) {
    callback(null, req);
  });

};

//
// Exports
//

module.exports.getInputStream  = getInputStream;
module.exports.getOutputStream = getOutputStream;
module.exports.protocol = 'http:';
