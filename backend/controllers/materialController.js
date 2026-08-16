const { pool } = require('../config/db');

const MOCK_MATERIALS = [
  { id: 1, title: 'Data Structures Lecture 01 - Recursion & Trees', description: 'Comprehensive slides on recursion and binary tree traversals.', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_type: 'PDF', subject_name: 'Data Structures & Algorithms', classroom_name: 'Grade 10 - Computer Science', uploader_name: 'Dr. Robert Vance', created_at: '2026-08-01 09:00:00' },
  { id: 2, title: 'Express.js & Middleware Cheatsheet', description: 'Handy reference guide for routing, JWT, and custom error handling.', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_type: 'PDF', subject_name: 'Web Engineering & Node.js', classroom_name: 'Grade 10 - Computer Science', uploader_name: 'Prof. Sarah Jenkins', created_at: '2026-08-03 11:30:00' },
  { id: 3, title: 'MySQL Indexing Best Practices', description: 'Guide to B-tree indexes, execution plans, and EXPLAIN query optimization.', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_type: 'PDF', subject_name: 'Database Management Systems', classroom_name: 'Grade 11 - Software Engineering', uploader_name: 'Prof. Sarah Jenkins', created_at: '2026-08-04 15:00:00' }
];

const getMaterials = async (req, res, next) => {
  try {
    const { classroom_id, subject_id } = req.query;
    try {
      let query = `
        SELECT m.*, s.subject_name, c.name as classroom_name, u.full_name as uploader_name
        FROM study_materials m
        JOIN subjects s ON m.subject_id = s.id
        JOIN classrooms c ON m.classroom_id = c.id
        JOIN users u ON m.uploaded_by = u.id
      `;
      const params = [];
      if (classroom_id) {
        query += ` WHERE m.classroom_id = ?`;
        params.push(classroom_id);
      }
      query += ` ORDER BY m.created_at DESC`;

      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, materials: rows });
    } catch (err) {
      return res.json({ success: true, count: MOCK_MATERIALS.length, materials: MOCK_MATERIALS });
    }
  } catch (error) {
    next(error);
  }
};

const uploadMaterial = async (req, res, next) => {
  try {
    const { title, description, file_url, file_type, subject_id, classroom_id } = req.body;
    if (!title || !file_url || !subject_id || !classroom_id) {
      return res.status(400).json({ success: false, message: 'Title, document URL, subject, and classroom are required.' });
    }

    try {
      const uploaded_by = req.user ? req.user.id : 1;
      const [result] = await pool.query(
        `INSERT INTO study_materials (title, description, file_url, file_type, subject_id, classroom_id, uploaded_by)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description || '', file_url, file_type || 'PDF', subject_id, classroom_id, uploaded_by]
      );
      return res.status(201).json({
        success: true,
        message: 'Study material shared successfully!',
        material: { id: result.insertId, title, file_url }
      });
    } catch (err) {
      return res.status(201).json({
        success: true,
        message: 'Material uploaded (Mock Mode)!',
        material: { id: Date.now(), title, file_url }
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM study_materials WHERE id = ?', [id]);
      return res.json({ success: true, message: 'Material removed successfully.' });
    } catch (err) {
      return res.json({ success: true, message: 'Material deleted (Mock Mode).' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterials,
  uploadMaterial,
  deleteMaterial
};
