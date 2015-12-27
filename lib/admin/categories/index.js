'use strict';
const router = require('express').Router();
const Category = require('lib/models/category');

router.get('/', function (req, res, next) {
  const query = req.query._id ? Category.findOne({
    _id: req.query._id
  }) : Category.find();

  query.sort('name _parent')
    .populate('_parent')
    .exec(function (err, categories) {
      if (err) next(err);
      res.json(categories);
    });
});

router.post('/:id?', function (req, res, next) {
  const cat = new Category(req.body);
  Category
    .findOneAndUpdate({
      _id: cat._id
    }, req.body, {
      upsert: true,
      new: true,
    }, function (err, category) {
      if (err) next(err);
      res.json(category);
    });
});

router.post('/:id/children', function (req, res, next) {
  const cat = new Category(req.body);
  cat._parent = req.params.id;

  cat.save(function (err, doc) {
    if (err) next(err);

    Category
      .findById(req.params.id)
      .exec(function (err, parent) {

        parent._children.push(doc);

        parent.save(function (err, parent) {
          if (err) next(err);
          doc._parent = parent;
          res.json(doc);
        });
      });
  });
});

router.post('/:id/details/:detailId', function (req, res, next) {
  Category
    .findById(req.params.id)
    .exec(function (err, category) {
      var detail = category.dtls.id(req.params.detailId);
      detail.values.push(req.body);

      category.save(function (err, doc) {
        if (err) next(err);
        res.json(doc);
      });
    });
});

router.delete('/:id', function (req, res, next) {
  Category
    .remove({
      _id: req.params.id
    }, function (err, doc) {
      if (err) next(err);
      res.json(doc);
    })
});


router.delete('/:id/details/:detailId/values/:valueId', function (req, res, next) {
  Category
    .findById(req.params.id, function (err, category) {
      const value = category
        .dtls.id(req.params.detailId)
        .values.id(req.params.valueId)
        .remove();

      category.save(function (err, cat) {
        if (err) next(err);
        res.json(cat);
      });

    })
});

module.exports = router;

