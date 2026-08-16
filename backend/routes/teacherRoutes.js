const express = require('express');
const router = express.Router();
const { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getAllTeachers);
router.get('/:id', verifyToken, getTeacherById);
router.post('/', verifyToken, checkRole(['admin']), createTeacher);
router.put('/:id', verifyToken, checkRole(['admin']), updateTeacher);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteTeacher);

module.exports = router;
