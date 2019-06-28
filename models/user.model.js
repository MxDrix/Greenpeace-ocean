

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const UserSchema = new Schema({
 name : String,
 lastname: String,
 phone: String,
 cp: String,
 acceptance: String,
 fish_level: {
   type: Number,
    default: 1
  },
 email : { 
   type :String,
   required: true,
   unique: true
 },
 message : String
})
UserSchema.plugin(uniqueValidator);
const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;