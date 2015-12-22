'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dtls: [{
    name: String
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
  }],
});


module.exports = mongoose.model('Category', CategorySchema);

