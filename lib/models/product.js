var async = require('async');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: Number,
  remaining: Number,
  info: String,
  dtls: {},
  deleted: {
    type: Boolean,
    default: false
  },
  comments: [{
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    rate: {
      type: Number,
      min: 1,
      max: 10
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});


ProductSchema.plugin(mongoosePaginate);

//getting total price of items
ProductSchema.statics.getTotalPrice = function (products, cb) {
  var productIds = products.map(function (item) {
    return item._id;
  });

  var price;

  this.find({
    '_id': {
      $in: productIds
    }
  }).select('_id price _user').exec(function (err, docs) {
    if (err) return cb(err);

    price = docs.reduce(function (a, b) {
      var quantity = products.find(function (item) {
        return item._id = b._id;
      }).quantity;

      return a + (b.price * quantity);
    }, 0);

    return cb(null, price);
  });
};

ProductSchema.statics.decreaseRemaining = function (products, cb) {
  var _this = this;
  async.eachSeries(products, function (product, callback) {
    _this.findOneAndUpdate({
      _id: product._id
    }, {
      $inc: {
        remaining: -product.quantity
      }
    }, callback);
  }, cb);
};

//check if there are enough products in stock
ProductSchema.statics.hasEnoughInStock = function (products, cb) {
  var _this = this;
  async.eachSeries(products, function (product, callback) {
    _this.findOne({
      _id: product._id,
      remaining: {
        $gte: product.quantity
      }
    }, function (err, pr) {
      if (err) return callback(err);
      if (!pr) return callback(new RangeError('items aren\'t sufficient'));
      return callback(null, pr);
    });

  }, cb);
};



module.exports = mongoose.model('Product', ProductSchema);

