const express = require('express');
const router = express.Router();
const { addMarks, updateMarks, getStudentMarks, getReportCardData } = require('../controllers/markController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.post('/', verifyToken, checkRole(['admin', 'teacher']), addMarks);
router.put('/:id', verifyToken, checkRole(['admin', 'teacher']), updateMarks);
router.get('/student/:studentId', verifyToken, getStudentMarks);
router.get('/report-card/:studentId', verifyToken, getReportCardData);

module.exports = router;
