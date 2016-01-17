'use strict';
var express = require('express');
var router = express.Router();
// var fs = require('fs');
var Product = require('../models/product');
var writeImage = require('../common/write-image');

/* GET home page. */
router.get('/', function (req, res, next) {
  Product
    .find({
      _user: req.user._id,
      deleted: false
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
        writeImage(product._id, image, 'storage/images/products', function () {
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
      _user: req.user._id
    }, {
      $set: {
        deleted: true
      }
    }, function (err, removed) {
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
      _user: req.user._id
    }, req.body, function (err, product) {
      if (err) return next(err);
      if (image) {
        writeImage(product._id, image, 'storage/images/products', function () {
          res.json(product);
        });
      } else {
        res.json(product);
      }

    });
});

module.exports = router;

