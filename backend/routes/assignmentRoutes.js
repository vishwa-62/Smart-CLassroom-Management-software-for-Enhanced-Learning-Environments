const express = require('express');
const router = express.Router();
const { getAssignments, createAssignment, submitAssignment, getSubmissions, gradeSubmission } = require('../controllers/assignmentController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getAssignments);
router.post('/', verifyToken, checkRole(['admin', 'teacher']), createAssignment);
router.post('/submit', verifyToken, checkRole(['student']), submitAssignment);
router.get('/:assignment_id/submissions', verifyToken, checkRole(['admin', 'teacher']), getSubmissions);
router.put('/grade/:submission_id', verifyToken, checkRole(['admin', 'teacher']), gradeSubmission);

module.exports = router;
