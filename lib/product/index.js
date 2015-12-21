var express = require('express');
var router = express.Router();
var Product = require('lib/models/product');

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

router.get('/:name', function (req, res, next) {
  Product.findOne({
    name: req.params.name
  }, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

module.exports = router;

