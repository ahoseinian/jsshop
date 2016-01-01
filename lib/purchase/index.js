'use strict';
const router = require('express').Router();
const Purchase = require('lib/models/purchase');
const Product = require('lib/models/product');

router.get('/', function (req, res, next) {
  Purchase.find({
    _user: req.user
  }).sort('-created_at').populate('products._product', '_id name price').exec(function (err, purchases) {
    if (err) return next(err);

    res.json(purchases);
  });
});

router.post('/', function (req, res, next) {
  const purchase = new Purchase(req.body);
  purchase._user = req.user;

  Product.getTotalPrice(req.body.products, function (err, price) {
    if (err) return next(err);

    purchase.price = price;

    purchase.save(function (err, purchase) {
      if (err) return next(err);

      res.json(purchase);
    });
  });
});

module.exports = router;

