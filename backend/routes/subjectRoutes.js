const express = require('express');
const router = express.Router();
const { getAllSubjects, createSubject, updateSubject, deleteSubject } = require('../controllers/subjectController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getAllSubjects);
router.post('/', verifyToken, checkRole(['admin']), createSubject);
router.put('/:id', verifyToken, checkRole(['admin']), updateSubject);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteSubject);

module.exports = router;
