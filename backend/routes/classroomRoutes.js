const express = require('express');
const router = express.Router();
const { getAllClassrooms, createClassroom, updateClassroom, deleteClassroom } = require('../controllers/classroomController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getAllClassrooms);
router.post('/', verifyToken, checkRole(['admin']), createClassroom);
router.put('/:id', verifyToken, checkRole(['admin']), updateClassroom);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteClassroom);

module.exports = router;
