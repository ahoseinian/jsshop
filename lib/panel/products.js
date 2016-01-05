const async = require('async');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var lwip = require('lwip');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
  Product
    .find({
      _user: req.user._id,
      deleted: false,
    })
    .sort('-created_at')
    .populate('_user', 'fullname')
    .populate('_category', 'id name')
    .exec(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

router.post('/', function (req, res, next) {
  var image = req.body.image;
  delete req.body.image;
  var product = new Product(req.body);
  product._user = req.user._id;

  product.save(function (err, product) {
    if (err) return next(err);

    Product.populate(product, '_user', function (err, product) {
      if (image) {
        writeImage(product._id, image, function () {
          res.json(product);
        });
      } else {
        res.json(product);
      }
    });
  });
});

router.delete('/:id', function (req, res, next) {
  Product
    .findOneAndUpdate({
        _id: req.params.id,
        _user: req.user._id,
      }, {
        $set: {
          deleted: true
        }
      },

      function (err, removed) {
        if (err) return next(err);

        res.json(removed);

        // async.series([
        //   function (cb) {
        //     fs.unlink('storage/images/products/800/' + req.params.id + '.jpg', cb);
        //   },
        //   function (cb) {
        //     fs.unlink('storage/images/products/400/' + req.params.id + '.jpg', cb);
        //   },
        //   function (cb) {
        //     fs.unlink('storage/images/products/200/' + req.params.id + '.jpg', cb);
        //   },
        //   function (cb) {
        //     fs.unlink('storage/images/products/150/' + req.params.id + '.jpg', cb);
        //   },
        //   function (cb) {
        //     fs.unlink('storage/images/products/100/' + req.params.id + '.jpg', cb);
        //   },
        //   function (cb) {
        //     fs.unlink('storage/images/products/50/' + req.params.id + '.jpg', cb);
        //   },
        //   function () {
        //     res.json(removed);
        //   }
        // ]);

      });
});

router.put('/:id', function (req, res, next) {
  var image = req.body.image;
  delete req.body.image;

  Product
    .findOneAndUpdate({
      _id: req.params.id,
      _user: req.user._id,
    }, req.body, function (err, product) {
      if (err) return next(err);
      if (image) {
        writeImage(product._id, image, function () {
          res.json(product);
        });
      } else {
        res.json(product);
      }

    });
});

module.exports = router;

//private methods

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) return new Error('Invalid input string');

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function writeImage(pId, data, callback) {
  var imageBuffer = decodeBase64Image(data);

  require('lwip')
    .open(imageBuffer.data, 'jpeg', function (err, image) {

      async.series([
        function (cb) {
          image.resize(800, function (err, fifty) {
            fifty.writeFile('storage/images/products/800/' + pId + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(400, function (err, hundered) {
            hundered.writeFile('storage/images/products/400/' + pId + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(200, function (err, hundredFifty) {
            hundredFifty.writeFile('storage/images/products/200/' + pId + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(150, function (err, twoHundered) {
            twoHundered.writeFile('storage/images/products/150/' + pId + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(100, function (err, fourHundered) {
            fourHundered.writeFile('storage/images/products/100/' + pId + '.jpg', cb);
          });
        },
        function (cb) {
          image.resize(50, function (err, eightHundered) {
            eightHundered.writeFile('storage/images/products/50/' + pId + '.jpg', cb);
          });
        },
        callback
      ]);

    });
}

