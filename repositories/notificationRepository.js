const Notification = require('../models/Notification');

exports.getNotification = () =>
    Notification.find({ userRole: "TRANSPORTER" })
        .sort({ createdAt: -1 });