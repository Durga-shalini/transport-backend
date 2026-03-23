const mongoose = require('mongoose');

const LoadSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  date: String,
  material: String,
  weight: Number,
  price: Number,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

module.exports = mongoose.model('Load', LoadSchema);