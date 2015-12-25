'use strict';
const router = require('express').Router();
const Category = require('lib/models/category');
const Product = require('lib/models/product');

router.get('/:name', function (req, res, next) {
  Category
    .findOne({
      name: req.params.name
    })
    .populate({
      path: '_children',
      select: '_id _children',
      populate: {
        path: '_children',
        select: '_id'
      }
    })
    .exec(function (err, category) {
      if (err) next(err);

      const grandParentFamily = category._children.reduce(findFamilyIds, [category._id]);

      Product
        .find({
          _category: {
            $in: grandParentFamily
          }
        }).limit(15).exec(function (err, products) {
          if (err) next(err);

          category._products = products;

          res.json(category);
        })

    })
});


function findFamilyIds(idsArray, cat) {
  var parentFamily = cat._id;
  if (cat._children) {
    parentFamily = cat._children.reduce(findFamilyIds, [parentFamily]);
  }
  return idsArray.concat(parentFamily);
}

module.exports = router;

