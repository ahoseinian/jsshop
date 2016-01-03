'use strict';
const _ = require('underscore');
const async = require('async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Purchase = require('lib/models/purchase');
const Product = require('lib/models/product');

var PurchasegroupSchema = new Schema({
  price: Number,

  address: {
    reciever: {
      type: String,
      maxlength: 100,
      required: true,
    },
    tel: {
      type: String,
      maxlength: 30,
      required: true,
    },
    state: {
      type: String,
      maxlength: 50,
      required: true,
    },
    postalcode: {
      type: String,
      maxlength: 30,
      required: true,
    },
    text: {
      type: String,
      maxlength: 500,
      required: true,
    },
  },

  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  products: [{
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    _product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
  }],
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

//save purchase group
PurchasegroupSchema.methods.savePurchasegroup = function (cb) {
  var _this = this;
  Product.hasEnoughInStock(_this.products, function (err) {
    if (err) return cb(err);

    Product.getTotalPrice(_this.products, function (err, price) {
      if (err) return cb(err);

      _this.price = price;
      _this.save(function (err, purchaseGroup) {
        if (err) return cb(err);

        Product.decreaseRemaining(_this.products, function (err) {
          if (err) return cb(err);

          purchaseGroup.breakPurchases(function (err) {
            return cb(null, purchaseGroup);
          });
        });

      });

    });
  });
};

//break purchases by their seller
PurchasegroupSchema.methods.breakPurchases = function (cb) {
  var _this = this;
  this.model('Purchasegroup').populate(this, {
    path: 'products._product',
    select: '_user'
  }, function (err, purchaseGroup) {
    if (err) return cb(err);

    var productGroups = _.groupBy(purchaseGroup.products, function (product) {
      return product._product._user;
    });

    async.forEachOfSeries(productGroups, function (products, sellerId, callback) {
      Product.getTotalPrice(products, function (err, price) {
        if (err) return cb(err);

        var purchase = new Purchase({
          products: products,
          price: price,
          _seller: sellerId,
          _purchasegroup: _this._id,
          _user: _this._user,
        });

        purchase.save(callback);
      });
    }, cb);

  });
};

module.exports = mongoose.model('Purchasegroup', PurchasegroupSchema);

