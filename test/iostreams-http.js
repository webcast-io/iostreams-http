
'use strict';

var ioStream = require('iostreams')();
var express  = require('express');
var http     = require('http');
var assert   = require('assert');
var crypto   = require('crypto');
var provider = require('../');
var app, server;

ioStream.use(provider);

function streamHash(stream, cb) {
  var hash = crypto.createHash('md5');
  stream.on('data', function(data) {
    hash.update(data);
  });
  stream.on('end', function() {
    cb(null, hash.digest('hex'));
  });
}

describe('iostreams-http', function() {

  this.timeout(5000);

  before(function(done) {
    app = express();
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/assets'))
    app.all('/300', function(req, res) { res.send(300); });
    app.all('/199', function(req, res) { res.send(199); });
    server = http.createServer(app).listen(3000, done);
  });

  describe('getProviderByProtocol', function() {

    it('should return a http instance based on the http: protocol', function() {
      assert.deepEqual(ioStream.getProviderByProtocol('http:'), provider);
    });

  });

  describe('getInputStream', function() {

    it('should provide a stream given a correct http string', function(done) {
      ioStream.getInputStream('http://localhost:3000/kitten1.jpg', function(err, stream) {
        assert.ifError(err);
        streamHash(stream, function(err, hash) {
          assert.ifError(err);
          assert.equal(hash, '89cd51c0ff0fe629a8980272f120de71');
          done();
        });
      });
    });
    it('should provide an error given a non 2xx status code (more than 299)', function(done) {
      ioStream.getInputStream('http://localhost:3000/300', function(err, stream) {
        assert.equal(err.message, 'Non 2xx statusCode: 300');
        done();
      });
    });
    it('should provide an error given a non 2xx status code (less than 200)', function(done) {
      ioStream.getInputStream('http://localhost:3000/199', function(err, stream) {
        assert.equal(err.message, 'Non 2xx statusCode: 199');
        done();
      });
    });

  });

  describe('getOutputStream', function() {

    it('should provide a stream given a correct http string');
    it('should provide an error given a http string with no http at path');
    it('should provide an error given a correct object input');
    it('should provide an error given a http object with no http at path');

  });

});
