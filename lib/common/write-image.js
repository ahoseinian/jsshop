'use strict';
var lwip = require('lwip');
var async = require('async');

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) return new Error('Invalid input string');

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

module.exports = function (name, data, path, callback) {

  var imageBuffer = decodeBase64Image(data);

  lwip
    .open(imageBuffer.data, 'jpeg', function (err, image) {

      async.series([
        function (cb) {
          image.resize(800, function (err, fifty) {
            fifty.writeFile(path + '/800/' + name + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(400, function (err, hundered) {
            hundered.writeFile(path + '/400/' + name + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(200, function (err, hundredFifty) {
            hundredFifty.writeFile(path + '/200/' + name + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(150, function (err, twoHundered) {
            twoHundered.writeFile(path + '/150/' + name + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(100, function (err, fourHundered) {
            fourHundered.writeFile(path + '/100/' + name + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(50, function (err, eightHundered) {
            eightHundered.writeFile(path + '/50/' + name + '.jpg', cb);
          });
        },
        callback
      ]);

    });
}

