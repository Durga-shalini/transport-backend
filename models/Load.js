
const mongoose = require('mongoose');
module.exports = mongoose.model('Load', new mongoose.Schema({
 origin:String,
 destination:String,
 date:String,
 material:String,
 weight:Number,
 price:Number,
 createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
}));
