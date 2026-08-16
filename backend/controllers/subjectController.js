const { pool } = require('../config/db');

const MOCK_SUBJECTS = [
  { id: 1, subject_name: 'Data Structures & Algorithms', subject_code: 'CS-101', teacher_name: 'Dr. Robert Vance', classroom_name: 'Grade 10 - Computer Science', credits: 4 },
  { id: 2, subject_name: 'Web Engineering & Node.js', subject_code: 'CS-102', teacher_name: 'Prof. Sarah Jenkins', classroom_name: 'Grade 10 - Computer Science', credits: 3 },
  { id: 3, subject_name: 'Database Management Systems', subject_code: 'CS-103', teacher_name: 'Prof. Sarah Jenkins', classroom_name: 'Grade 11 - Software Engineering', credits: 4 },
  { id: 4, subject_name: 'Computer Architecture', subject_code: 'CS-104', teacher_name: 'Michael Chen', classroom_name: 'Grade 11 - Software Engineering', credits: 3 },
  { id: 5, subject_name: 'Machine Learning Basics', subject_code: 'CS-105', teacher_name: 'Dr. Robert Vance', classroom_name: 'Grade 12 - Data Science', credits: 4 }
];

const getAllSubjects = async (req, res, next) => {
  try {
    try {
      const [rows] = await pool.query(
        `SELECT sub.*, 
                u.full_name as teacher_name, 
                c.name as classroom_name
         FROM subjects sub
         LEFT JOIN teachers t ON sub.teacher_id = t.id
         LEFT JOIN users u ON t.user_id = u.id
         LEFT JOIN classrooms c ON sub.classroom_id = c.id
         ORDER BY sub.subject_name ASC`
      );
      return res.json({ success: true, count: rows.length, subjects: rows });
    } catch (err) {
      return res.json({ success: true, count: MOCK_SUBJECTS.length, subjects: MOCK_SUBJECTS });
    }
  } catch (error) {
    next(error);
  }
};

const createSubject = async (req, res, next) => {
  try {
    const { subject_name, subject_code, teacher_id, classroom_id, credits } = req.body;
    if (!subject_name || !subject_code) {
      return res.status(400).json({ success: false, message: 'Subject name and code are required.' });
    }
    try {
      const [result] = await pool.query(
        'INSERT INTO subjects (subject_name, subject_code, teacher_id, classroom_id, credits) VALUES (?, ?, ?, ?, ?)',
        [subject_name, subject_code, teacher_id || null, classroom_id || null, credits || 3]
      );
      return res.status(201).json({
        success: true,
        message: 'Subject added successfully!',
        subject: { id: result.insertId, subject_name, subject_code, credits }
      });
    } catch (err) {
      return res.status(201).json({
        success: true,
        message: 'Subject added (Mock Mode)!',
        subject: { id: Date.now(), subject_name, subject_code, credits }
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject_name, subject_code, teacher_id, classroom_id, credits } = req.body;
    try {
      await pool.query(
        'UPDATE subjects SET subject_name = COALESCE(?, subject_name), subject_code = COALESCE(?, subject_code), teacher_id = COALESCE(?, teacher_id), classroom_id = COALESCE(?, classroom_id), credits = COALESCE(?, credits) WHERE id = ?',
        [subject_name, subject_code, teacher_id, classroom_id, credits, id]
      );
      return res.json({ success: true, message: 'Subject updated successfully.' });
    } catch (err) {
      return res.json({ success: true, message: 'Subject updated (Mock Mode).' });
    }
  } catch (error) {
    next(error);
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM subjects WHERE id = ?', [id]);
      return res.json({ success: true, message: 'Subject deleted successfully.' });
    } catch (err) {
      return res.json({ success: true, message: 'Subject deleted (Mock Mode).' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject
};
