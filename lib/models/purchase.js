'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseSchema = new Schema({
  status: {
    type: Number,
    default: 1,
  },
  price: Number,
  products: [{
    quantity: {
      type: Number,
      min: 1,
      max: 9,
    },
    _product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
  }],
  _seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _purchaseGroup: {
    type: Schema.Types.ObjectId,
    ref: 'PurchaseGroup'
  },
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);

