# iostreams-http

Bootstrap stream provider for [iostreams](https://github.com/webcast-io/iostreams)

[![Build Status](https://travis-ci.org/webcast-io/iostreams-http.png)](https://travis-ci.org/webcast-io/iostreams-http?branch=master)
[![Coverage Status](https://coveralls.io/repos/webcast-io/iostreams-http/badge.png?branch=master)](https://coveralls.io/r/webcast-io/iostreams-http?branch=master)
[![Dependency Status](https://david-dm.org/webcast-io/iostreams-http.png?theme=shields.io)](https://david-dm.org/webcast-io/iostreams-http)

## Install

    $ npm install iostreams iostreams-http

## Usage

```js
var iostreams = require('iostreams');

iostreams.use(require('iostreams-http'));

// Getting an input stream
iostreams.getInputStream('http://bensbit.co.uk/lolcat.png', function(err, inputStream) {

});

// Getting an output stream
iostreams.getOutputStream('http://bensbit.co.uk/api/upload/lolcat2.png', function(err, outputStream) {

});

// Getting an input and output stream
iostrams.getInputAndOutputStream(
  'http://inputpath',
  'http://outputpath',
  function(err, inputStream, outputStream) {
    intputStream.pipe(outputStream);
  }
);
```

## Licence

MIT