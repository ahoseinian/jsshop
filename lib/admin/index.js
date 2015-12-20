'use strict';
const router = require('express').Router();

router.use('/categories', require('./categories'));
router.get('/', function (req, res, next) {
  res.render('admin/index')
});

module.exports = router;

