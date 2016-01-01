'use strict';
const router = require('express').Router();
const Category = require('lib/models/category');
const Product = require('lib/models/product');

router.get('/:name', function (req, res, next) {
  Category.findOne({
    name: req.params.name
  }).populate({
    path: '_children',
    select: '_id _children',
    populate: {
      path: '_children',
      select: '_id'
    }
  }).populate({
    path: '_parent',
    select: '_id _parent dtls',
    populate: {
      path: '_parent',
      select: '_id dtls'
    }
  }).exec(function (err, category) {
    if (err) next(err);

    //get all parents dtls
    if (category._parent) {
      category.dtls = category.dtls.concat(category._parent.dtls);
      if (category._parent._parent) {
        category.dtls = category.dtls.concat(category._parent._parent.dtls);
      }
    }

    const grandParentFamily = category._children.reduce(findFamilyIds, [category._id]);

    var productQuery = Product.find({
      deleted: false,
      remaining: {
        $gt: 0
      },
      _category: {
        $in: grandParentFamily
      }
    });

    if (req.query) {
      productQuery.where(req.query);
    }

    productQuery.limit(15).exec(function (err, products) {
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

