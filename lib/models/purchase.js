'use strict';
var mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema;

var PurchaseSchema = new Schema({
  status: {
    type: Number,
    default: 0
  },
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

PurchaseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Purchase', PurchaseSchema);

