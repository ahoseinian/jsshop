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
      required: true,
    },
    _product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
  }],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _purchasegroup: {
    type: Schema.Types.ObjectId,
    ref: 'Purchasegroup'
  },
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);

