'use strict';
var router = require('express').Router();
var Category = require('../models/category');

router.get('/:name', function (req, res, next) {
  Category
    .findOneAndPopulateChildren(req.params.name)
    .exec(function (err, category) {
      if (err) return next(err);
      //get all parents dtls
      category.getParentDetails();

      category.getProducts(req.query, function (err, category) {
        if (err) return next(err);
        category.getPriceRanges(req.query, function (err, priceRanges) {
          if (err) return next(err);
          res.json({
            data: category,
            priceRanges: priceRanges
          });
        });
      });

    });
});

module.exports = router;

