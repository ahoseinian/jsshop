'use strict';
const router = require('express').Router();
const PurchaseGroup = require('lib/models/purchase-group');
const Purchase = require('lib/models/purchase');

router.get('/', function (req, res, next) {
  Purchase
    .find({
      _user: req.user
    })
    .populate('_purchasegroup', 'address')
    .populate('products._product', '_id name price')
    .populate('_seller', 'fullname')
    .populate('_user', 'fullname email')
    .sort('-created_at')
    .exec(function (err, purchases) {
      if (err) return next(err);

      res.json(purchases);
    });
});

router.post('/', function (req, res, next) {
  const purchaseGroup = new PurchaseGroup(req.body);
  purchaseGroup._user = req.user;
  purchaseGroup.savePurchasegroup(function (err, doc) {
    if (err) return next(err);

    res.json(purchaseGroup);
  });

});

module.exports = router;

