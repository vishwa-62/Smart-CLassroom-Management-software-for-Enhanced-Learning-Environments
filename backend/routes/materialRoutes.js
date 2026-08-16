const express = require('express');
const router = express.Router();
const { getMaterials, uploadMaterial, deleteMaterial } = require('../controllers/materialController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', verifyToken, getMaterials);
router.post('/', verifyToken, checkRole(['admin', 'teacher']), uploadMaterial);
router.delete('/:id', verifyToken, checkRole(['admin', 'teacher']), deleteMaterial);

module.exports = router;
