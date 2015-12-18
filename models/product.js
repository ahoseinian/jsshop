var mongoose = require('mongoose'), 
	mongoosePaginate = require('mongoose-paginate'), 
	Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {type: String, required: true},
  price: Number,
  info: String,
  cat: String,
  dtls: {},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: { createdAt: 'created_at' }});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);