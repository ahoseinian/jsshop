'use strict';
const router = require('express').Router();
const Category = require('lib/models/category');

router.get('/', function (req, res, next) {

  Category
    .find({})
    .exec(function (err, categories) {
      if (err) next(err);
      res.json(categories);
    });
});

router.post('/:id?', function (req, res, next) {
  const cat = new Category(req.body);
  Category
    .findOneAndUpdate({ _id: cat._id }, req.body, { upsert: true, new: true, }, function (err, category) {
      if (err) next(err);
      res.json(category);
    });
});

router.delete('/:id', function (req, res, next) {
  Category
    .remove({ _id: req.params.id }, function (err, doc) {
      if (err) next(err);
      res.json(doc);
    })
});

module.exports = router;

