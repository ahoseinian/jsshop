'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true },
  dtls: [{ name:String }],
});


module.exports = mongoose.model('Category', CategorySchema);

