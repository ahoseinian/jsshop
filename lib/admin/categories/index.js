'use strict';
var router = require('express').Router();
var Category = require('../../models/category');
var writeImage = require('../../common/write-image');

router.get('/', function (req, res, next) {
  var query = req.query._id ? Category.findOne({
    _id: req.query._id
  }) : Category.find();

  query.sort('name _parent')
    .populate('_parent')
    .exec(function (err, categories) {
      if (err) return next(err);
      res.json(categories);
    });
});

router.post('/:id?', function (req, res, next) {
  var id = req.body._id;
  var image = req.body.pic;
  delete req.body.image;
  delete req.body._id;
  delete req.body.__v;

  Category
    .findOneAndUpdate({
      _id: id
    }, req.body, {
      upsert: true,
      new: true
    }, function (err, category) {
      if (err) return next(err);
      if (image) {
        writeImage(category._id, image, 'storage/images/categories', function () {
          res.json(category);
        });
      } else {
        res.json(category);
      }
    });
});

router.post('/:id/children', function (req, res, next) {
  var cat = new Category(req.body);
  cat._parent = req.params.id;

  cat.save(function (err, doc) {
    if (err) return next(err);

    Category
      .findById(req.params.id)
      .exec(function (err, parent) {

        parent._children.push(doc);

        parent.save(function (err, parent) {
          if (err) return next(err);
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
        if (err) return next(err);
        res.json(doc);
      });
    });
});

router.delete('/:id', function (req, res, next) {
  Category
    .remove({
      _id: req.params.id
    }, function (err, doc) {
      if (err) return next(err);
      res.json(doc);
    });
});

router.delete('/:id/details/:detailId/values/:valueId', function (req, res, next) {
  Category
    .findById(req.params.id, function (err, category) {
      category
        .dtls.id(req.params.detailId)
        .values.id(req.params.valueId)
        .remove();

      category.save(function (err, cat) {
        if (err) return next(err);
        res.json(cat);
      });

    });
});

module.exports = router;

