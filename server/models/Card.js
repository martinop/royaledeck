var mongoose = require('mongoose');
var cardSchema = new mongoose.Schema({
  name: String,
  movement: String,
  type: String,
  arena: Number,
  image: String,
  elixir: Number
});

cardSchema.pre('save', function(next, inserted) {
  next();
});


module.exports = mongoose.model('Card', cardSchema);