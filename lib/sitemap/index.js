'use strict';
var sm = require('sitemap');
var Category = require('../models/category');

var sitemap = sm.createSitemap({
  hostname: 'http://miarim.com',
  cacheTime: 600000, // 600 sec - cache purge period
  urls: []
});

module.exports = function (req, res, next) {
  Category.find({}).select('name _parent').exec(function (err, categories) {
    categories.forEach(function (cat) {
      var priority = cat._parent ? 0.5 : 0.9;
      sitemap.urls.push({
        url: '/#/categories/' + cat.name,
        changefreq: 'monthly',
        priority: priority
      });
    });
    sitemap.toXML(function (err, xml) {
      if (err) return next(err);
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });
};

