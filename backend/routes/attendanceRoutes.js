const express = require('express');
const router = express.Router();
const { markAttendance, getStudentAttendance, getClassroomAttendance, verifyQrAttendance } = require('../controllers/attendanceController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.post('/', verifyToken, checkRole(['admin', 'teacher']), markAttendance);
router.post('/qr-verify', verifyToken, checkRole(['admin', 'teacher']), verifyQrAttendance);
router.get('/student/:id', verifyToken, getStudentAttendance);
router.get('/classroom/:id', verifyToken, getClassroomAttendance);

module.exports = router;
