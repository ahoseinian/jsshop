'use strict';
const router = require('express').Router();
const Category = require('lib/models/category');
const Product = require('lib/models/product');

router.get('/:name', function (req, res, next) {
  Category
    .findOne({
      name: req.params.name
    }).exec(function (err, category) {
      if (err) next(err);

      Product
        .find({
          _category: category._id
        }).limit(15).exec(function (err, products) {
		      if (err) next(err);

		      category._products = products;
		      res.json(category);
        })

    })
});
module.exports = router;

