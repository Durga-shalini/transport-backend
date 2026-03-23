const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mobile: String,
    role: {
        type: String,
        enum: ['ADMIN', 'BUYSELL', 'TRANSPORTER'],
        required: true
    },
    otp: String,
    otpExpiry: Date
});

module.exports = mongoose.model('User', UserSchema);