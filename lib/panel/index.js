'use strict';
const router = require('express').Router();
const Category = require('lib/models/category');

router.get('/', function (req, res, next) {

  Category.find().populate({
    path: '_parent',
    select: '_id _parent dtls',
    populate: {
      path: '_parent',
      select: '_id dtls'
    }
  }).exec(function (err, cats) {

    cats.forEach(function (element, index) {
      //get all parents dtls
      if (element._parent) {
        cats[index].dtls = element.dtls.concat(element._parent.dtls);
        if (element._parent._parent) {
          cats[index].dtls = element.dtls.concat(element._parent._parent.dtls);
        }
      }
    });

    res.render('panel/index', {
      user: req.user,
      cats: cats,
    });
  });
});

router.use('/products', require('./products'));
router.use('/purchases', require('./purchases'));
module.exports = router;

