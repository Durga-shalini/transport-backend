const NotificationRepo = require('../repositories/notificationRepository.js');

// Get Notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationRepo.getNotification();

    return res.status(200).json({ success: true,  data: notifications
    });

  } catch (err) {
    console.error("Get Notifications Error:", err);

    return res.status(500).json({  success: false,message: "Error fetching notifications"
    });
  }
};