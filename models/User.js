
const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
 mobile:String,
 role:{type:String, enum:['ADMIN','BUYSELL','TRANSPORTER']}
}));
