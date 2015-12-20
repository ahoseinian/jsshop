var express = require('express');
var router = express.Router();
var Product = require('./product-model');

/* GET home page. */
router.get('/', function (req, res, next) {
  Product
    .find()
    .sort('-created_at')
    .limit(12)
    .populate('_user _cat')
    .exec(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

router.get('/:id', function (req, res, next) {
  Product.findOne({
    _id: req.params.id
  }, function (err, product) {
    if (err) return next(err);

    res.json(product);
  })
});

module.exports = router;

