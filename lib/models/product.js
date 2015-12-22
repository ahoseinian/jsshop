var mongoose = require('mongoose'), 
	mongoosePaginate = require('mongoose-paginate'), 
	Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: Number,
  info: String,
  dtls: {},
  comments: [{
  	_user: { type: Schema.Types.ObjectId, ref: 'User' },
  	text: String,
    rate: { type: Number, min: 1, max: 10 },
  	created_at: { type: Date, default: Date.now },
  }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _category: { type: Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: { createdAt: 'created_at' }});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);