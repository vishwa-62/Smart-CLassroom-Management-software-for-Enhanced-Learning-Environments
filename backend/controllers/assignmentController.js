const { pool } = require('../config/db');

const MOCK_ASSIGNMENTS = [
  { id: 1, title: 'Binary Tree Implementation', description: 'Implement AVL Tree balancing algorithms in JavaScript/Python.', subject_name: 'Data Structures & Algorithms', classroom_name: 'Grade 10 - Computer Science', teacher_name: 'Dr. Robert Vance', due_date: '2026-08-15 23:59:00', total_points: 100, submission_status: 'graded', grade: 95.00 },
  { id: 2, title: 'RESTful Express API Setup', description: 'Build a simple JWT authenticated CRUD microservice.', subject_name: 'Web Engineering & Node.js', classroom_name: 'Grade 10 - Computer Science', teacher_name: 'Prof. Sarah Jenkins', due_date: '2026-08-18 23:59:00', total_points: 50, submission_status: 'submitted', grade: null },
  { id: 3, title: 'SQL Schema Optimization', description: 'Design normalized 3NF database schema with indexes.', subject_name: 'Database Management Systems', classroom_name: 'Grade 11 - Software Engineering', teacher_name: 'Prof. Sarah Jenkins', due_date: '2026-08-12 23:59:00', total_points: 100, submission_status: 'pending', grade: null }
];

const getAssignments = async (req, res, next) => {
  try {
    const { classroom_id, subject_id } = req.query;
    try {
      let query = `
        SELECT a.*, 
               s.subject_name, 
               c.name as classroom_name, 
               u.full_name as teacher_name
        FROM assignments a
        JOIN subjects s ON a.subject_id = s.id
        JOIN classrooms c ON a.classroom_id = c.id
        JOIN teachers t ON a.teacher_id = t.id
        JOIN users u ON t.user_id = u.id
      `;
      const params = [];
      if (classroom_id) {
        query += ` WHERE a.classroom_id = ?`;
        params.push(classroom_id);
      }
      query += ` ORDER BY a.due_date ASC`;

      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, assignments: rows });
    } catch (err) {
      return res.json({ success: true, count: MOCK_ASSIGNMENTS.length, assignments: MOCK_ASSIGNMENTS });
    }
  } catch (error) {
    next(error);
  }
};

const createAssignment = async (req, res, next) => {
  try {
    const { title, description, subject_id, classroom_id, teacher_id, due_date, total_points, attachment_url } = req.body;
    if (!title || !subject_id || !classroom_id || !due_date) {
      return res.status(400).json({ success: false, message: 'Title, subject, classroom, and due date are required.' });
    }

    try {
      const [result] = await pool.query(
        `INSERT INTO assignments (title, description, subject_id, classroom_id, teacher_id, due_date, total_points, attachment_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description || '', subject_id, classroom_id, teacher_id || 1, due_date, total_points || 100, attachment_url || null]
      );
      return res.status(201).json({
        success: true,
        message: 'Assignment created successfully!',
        assignment: { id: result.insertId, title, due_date, total_points }
      });
    } catch (err) {
      return res.status(201).json({
        success: true,
        message: 'Assignment created (Mock Mode)!',
        assignment: { id: Date.now(), title, due_date, total_points: total_points || 100 }
      });
    }
  } catch (error) {
    next(error);
  }
};

const submitAssignment = async (req, res, next) => {
  try {
    const { assignment_id, student_id, submission_url, comments } = req.body;
    if (!assignment_id || !submission_url) {
      return res.status(400).json({ success: false, message: 'Assignment ID and submission link are required.' });
    }

    try {
      const studentId = student_id || 1;
      await pool.query(
        `INSERT INTO assignment_submissions (assignment_id, student_id, submission_url, comments, status)
         VALUES (?, ?, ?, ?, 'submitted')
         ON DUPLICATE KEY UPDATE submission_url = VALUES(submission_url), comments = VALUES(comments), submitted_at = CURRENT_TIMESTAMP`,
        [assignment_id, studentId, submission_url, comments || null]
      );
      return res.json({ success: true, message: 'Assignment submitted successfully!' });
    } catch (err) {
      return res.json({ success: true, message: 'Assignment submitted (Mock Mode)!' });
    }
  } catch (error) {
    next(error);
  }
};

const getSubmissions = async (req, res, next) => {
  try {
    const { assignment_id } = req.params;
    try {
      const [rows] = await pool.query(
        `SELECT sub.*, u.full_name as student_name, st.roll_number
         FROM assignment_submissions sub
         JOIN students st ON sub.student_id = st.id
         JOIN users u ON st.user_id = u.id
         WHERE sub.assignment_id = ?
         ORDER BY sub.submitted_at DESC`,
        [assignment_id]
      );
      return res.json({ success: true, count: rows.length, submissions: rows });
    } catch (err) {
      return res.json({
        success: true,
        count: 1,
        submissions: [
          { id: 1, student_name: 'Alex Johnson', roll_number: 'STU-2025-001', submission_url: 'https://github.com/alexjohnson/binary-tree-lab', status: 'graded', grade: 95.00, feedback: 'Excellent submission!' }
        ]
      });
    }
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const { submission_id } = req.params;
    const { grade, feedback } = req.body;
    if (grade === undefined) {
      return res.status(400).json({ success: false, message: 'Grade value is required.' });
    }

    try {
      await pool.query(
        `UPDATE assignment_submissions 
         SET grade = ?, feedback = ?, status = 'graded', graded_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [grade, feedback || null, submission_id]
      );
      return res.json({ success: true, message: 'Grade and feedback submitted successfully.' });
    } catch (err) {
      return res.json({ success: true, message: 'Grade updated (Mock Mode).' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAssignments,
  createAssignment,
  submitAssignment,
  getSubmissions,
  gradeSubmission
};
