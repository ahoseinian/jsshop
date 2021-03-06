'use strict';

var assetmanager = require('assetmanager');

var assets = assetmanager.process({
  assets: require('./assets.json'),
  debug: (process.env.NODE_ENV !== 'production'),
  webroot: 'public'
});

module.exports = function (req, res, next) {
  assets.main.js = assets.main.js.map(removeWebRoots);
  assets.front.js = assets.front.js.map(removeWebRoots);
  assets.main.css = assets.main.css.map(removeWebRoots);

  function removeWebRoots(f) {
    return f.replace('bower_components', '');
  }
  res.locals = {
    assets: assets
  };
  next();
};

