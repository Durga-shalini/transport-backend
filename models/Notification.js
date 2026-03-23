
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userRole: String,
  message: String,
  loadId: mongoose.Schema.Types.ObjectId,
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);