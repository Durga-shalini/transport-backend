const User = require('../models/User');

exports.findByMobile = (mobile) => User.findOne({ mobile });

exports.createUser = (data) => User.create(data);

exports.updateOTP = (mobile, otp, otpExpiry,role) => {
  return User.findOneAndUpdate(
    { mobile },
    { otp, otpExpiry ,role},
    { new: true, upsert: true }
  );
};



exports.clearOTP = (mobile) => {
  return User.findOneAndUpdate(
    { mobile },
    { otp: null, otpExpiry: null }
  );
};