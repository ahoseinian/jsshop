'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseGroupSchema = new Schema({
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
      max: 9,
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

module.exports = mongoose.model('PurchaseGroup', PurchaseGroupSchema);

