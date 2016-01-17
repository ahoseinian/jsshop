'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');
var async = require('async');
var range = require('range').range;
var _ = require('lodash');

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dtls: [{
    name: String,
    values: [{
      name: String
    }]
  }],
  _children: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  _parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  _products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  toJSON: {
    virtuals: true
  }
});

//returns Promise
CategorySchema.statics.findOneAndPopulateChildren = function (name) {
  return this.findOne({
    name: name
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
  });
};

//get product of a give category
CategorySchema.methods.getProducts = function (query, cb) {
  var _this = this;
  query = fixQuery(query);
  Product
    .find({
      deleted: false,
      _category: {
        $in: this.getFamilyIds()
      }
    })
    .where(query)
    .sort('-remaining')
    .limit(15)
    .exec(function (err, products) {
      if (err) return cb(err);

      _this._products = products;

      return cb(null, _this);
    });
};

//get all parents dtls
CategorySchema.methods.getParentDetails = function () {
  if (this._parent) {
    this.dtls = this.dtls.concat(this._parent.dtls);
    if (this._parent._parent) {
      this.dtls = this.dtls.concat(this._parent._parent.dtls);
    }
  }
  return this;
};

//Get all the children ids of a category in order
// to find relevent products
CategorySchema.methods.getFamilyIds = function () {
  return this._children.reduce(findFamilyIds, [this._id]);
};

CategorySchema.methods.getPriceRanges = function (query, cb) {
  var _this = this;

  //get the range
  _this.getMinMax(function (err, minMax) {
    if (err) return cb(err);

    var splitNumber = 6;
    var ranges = range(minMax[0], minMax[1], (minMax[1] - minMax[0]) / splitNumber).map(function (item) {
      return item | 0;
    }).concat(minMax[1]);

    var i = 0;
    async.mapSeries(ranges, function (range, callback) {
      var from = ranges[i - 1] || 0;
      var to = range;
      var productQuery = Product
        .find({
          deleted: false,
          _category: {
            $in: _this.getFamilyIds()
          }
        }).where(query);

      productQuery.where({
        price: {
          $gt: from,
          $lte: to
        }
      });

      productQuery.count(function (err, count) {
        i++;
        callback(err, {
          from: from,
          to: to,
          count: count
        });
      });
    }, cb);

  });
};

CategorySchema.methods.getMinMax = function (cb) {
  var _this = this;
  async.parallel([
    function (callback) {
      _this.getHighestOrLowestPrice('price', callback);
    },
    function (callback) {
      _this.getHighestOrLowestPrice('-price', callback);
    }
  ], cb);
};

CategorySchema.methods.getHighestOrLowestPrice = function (sort, cb) {
  Product
    .findOne({
      deleted: false,
      _category: {
        $in: this.getFamilyIds()
      }
    })
    .sort(sort)
    .exec(function (err, product) {
      if (err) return cb(err);
      if (product) return cb(null, product.price);
      return cb(null, null);
    });
};

CategorySchema.virtual('image.two').get(function () {
  return '/images/categories/200/' + this._id + '.jpg';
});

module.exports = mongoose.model('Category', CategorySchema);

//private methods
function findFamilyIds(idsArray, cat) {
  var parentFamily = cat._id;
  if (cat._children) {
    parentFamily = cat._children.reduce(findFamilyIds, [parentFamily]);
  }
  return idsArray.concat(parentFamily);
}

function fixQuery(query) {
  _.forEach(query, function (item, k) {
    query[k] = _.omit(query[k], _.isEmpty);
  });
  query = _.omit(query, _.isEmpty);

  return query;
}

