var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, 
    sparse: true,
    lowercase: true, 
    trim: true
  },
  name: String,
  email: String,
  picture: String,
  facebook: String,
  twitter: String,
  google: String,
  create_at: {type: Date, default: Date.now }
});

userSchema.pre('save', function(next, inserted) {
  var user = this;
  next();
});


module.exports = mongoose.model('User', userSchema);