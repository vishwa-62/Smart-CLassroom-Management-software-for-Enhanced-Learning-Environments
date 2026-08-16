const express = require('express');
const router = express.Router();
const { getTimetable, createTimetable, updateTimetable, deleteTimetable } = require('../controllers/timetableController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getTimetable);
router.post('/', verifyToken, checkRole(['admin']), createTimetable);
router.put('/:id', verifyToken, checkRole(['admin']), updateTimetable);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteTimetable);

module.exports = router;
