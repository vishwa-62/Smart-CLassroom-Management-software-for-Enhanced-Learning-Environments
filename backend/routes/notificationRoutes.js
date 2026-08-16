const express = require('express');
const router = express.Router();
const { createNotification, getNotificationsByRole } = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getNotificationsByRole);
router.post('/', verifyToken, checkRole(['admin', 'teacher']), createNotification);

module.exports = router;
