var mongoose = require('mongoose');
var likesPlugin = require('mongoose-likes');
var deckSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  arena: Number,
  elixir: Number,
  index: Number,
  disable: {type: Boolean, default: false},
  create_at: {type: Date, default: Date.now },
  cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
deckSchema.plugin(likesPlugin);
deckSchema.pre('save', function(next, inserted) {
  next();
});


module.exports = mongoose.model('Deck', deckSchema);