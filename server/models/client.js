var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  first_name: String,
  last_name: String,
  address: String,
  primary_phone: String,
  secondary_phone: String,
  pets: [{
    name: String,
    breed: String,
    age: Number,
    sex: String
  }],
  veterinarian: String,
  comments: [{
    comment: String
  }],
  bow: Boolean,
  bandana: Boolean,
  back_comments: [{
    comment: String
  }],
  created_at: Date,
  updated_at: Date
});

clientSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  // Add current date to created_at if it does not exist
  if (!this.created_at) this.created_at = currentDate;

  next();
});

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
