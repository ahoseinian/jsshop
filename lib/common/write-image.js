'use strict';
var lwip = require('lwip');
var async = require('async');

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) return new Error('Invalid input string');

  response.type = matches[1].split('/')[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

module.exports = function (name, data, path, sizes, callback) {
  if (typeof callback === 'undefined') {
    callback = sizes;
    sizes = [800, 400, 200, 150, 100, 50];
  }
  var imageBuffer = decodeBase64Image(data);
  console.log(imageBuffer.type);

  lwip
    .open(imageBuffer.data, imageBuffer.type, function (err, image) {
      var extension = imageBuffer.type == 'jpeg' ? '.jpg' : '.png';

      async.eachSeries(sizes, function (size, cb) {
        image.resize(size, function (err, img) {
          img.writeFile(path + '/' + size + '/' + name + extension, cb);
        });
      }, callback);

    });
};

