const express = require('express');
const router = express.Router();
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getAllStudents);
router.get('/:id', verifyToken, getStudentById);
router.post('/', verifyToken, checkRole(['admin', 'teacher']), createStudent);
router.put('/:id', verifyToken, checkRole(['admin', 'teacher']), updateStudent);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteStudent);

module.exports = router;
