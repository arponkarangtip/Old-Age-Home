const mongoose = require('mongoose');

const ResidentSchema = new mongoose.Schema({
  name:{type:String, required:true},
  age:Number,
  medical:String,
  room:String,
  linkedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps:true });

module.exports = mongoose.model('Resident', ResidentSchema);
