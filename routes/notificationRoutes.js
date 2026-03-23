const router = require('express').Router();
const notification = require("../controllers/notificationController.js")
const { verifyToken } = require("../middleware/authMiddleware");
const role = require('../middleware/roleMiddleware');

router.get("/", verifyToken, role(['TRANSPORTER']), notification.getNotifications);

module.exports = router;