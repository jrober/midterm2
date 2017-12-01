var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
  title: String,
  price: {type: Number, default: 0},
  url: String,
  ordered: {type: Number, default: 0},
  cart: {type: Number, default: 0}
});

orderSchema.methods.upOrder = function(cb) {
  this.ordered += 1;
  this.save(cb);
};

orderSchema.methods.addCart = function(cb) {
  this.cart = 1;
  this.save(cb);
};

orderSchema.methods.deleteCart = function(cb) {
  this.cart = 0;
  this.save(cb);
};

mongoose.model('Posting', orderSchema);

