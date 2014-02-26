
'use strict';

var ioStream     = require('iostreams')();
var provider = require('../');

ioStream.use(provider);

describe('iostreams-file', function() {

  describe('getProviderByProtocol', function() {

    it('should return a file instance based on the file: protocol');

  });

  describe('getInputStream', function() {

    it('should provide a stream given a correct file string');
    it('should provide an error given a file string with no file at path');
    it('should provide an error given a file object with no file at path');

  });

  describe('getOutputStream', function() {

    it('should provide a stream given a correct file string');
    it('should provide an error given a file string with no file at path');
    it('should provide an error given a correct object input');
    it('should provide an error given a file object with no file at path');

  });

});
