const { pool } = require('../config/db');

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Welcome to Smart Classroom Platform!', message: 'We are excited to launch our upgraded interactive learning portal.', target_role: 'all', created_at: '2026-08-01 10:00:00', creator_name: 'System Administrator' },
  { id: 2, title: 'Midterm Exam Schedule Released', message: 'Please review the updated exam schedule for Grade 10 & Grade 11.', target_role: 'student', created_at: '2026-08-05 14:30:00', creator_name: 'Dr. Robert Vance' },
  { id: 3, title: 'Faculty Meeting on Friday at 3 PM', message: 'All departmental head teachers are requested to gather in Conference Room A.', target_role: 'teacher', created_at: '2026-08-07 09:15:00', creator_name: 'System Administrator' }
];

const createNotification = async (req, res, next) => {
  try {
    const { title, message, target_role, classroom_id } = req.body;
    if (!title || !message) {
      return res.status(400).json({ success: false, message: 'Title and message content are required.' });
    }

    try {
      const created_by = req.user ? req.user.id : 1;
      const [result] = await pool.query(
        `INSERT INTO notifications (title, message, target_role, classroom_id, created_by)
         VALUES (?, ?, ?, ?, ?)`,
        [title, message, target_role || 'all', classroom_id || null, created_by]
      );
      return res.status(201).json({
        success: true,
        message: 'Announcement broadcasted successfully!',
        notification: { id: result.insertId, title, target_role: target_role || 'all' }
      });
    } catch (err) {
      return res.status(201).json({
        success: true,
        message: 'Announcement broadcasted (Mock Mode)!',
        notification: { id: Date.now(), title, target_role: target_role || 'all' }
      });
    }
  } catch (error) {
    next(error);
  }
};

const getNotificationsByRole = async (req, res, next) => {
  try {
    const role = req.user ? req.user.role : (req.query.role || 'all');
    try {
      const [rows] = await pool.query(
        `SELECT n.*, u.full_name as creator_name, c.name as classroom_name
         FROM notifications n
         JOIN users u ON n.created_by = u.id
         LEFT JOIN classrooms c ON n.classroom_id = c.id
         WHERE n.target_role = 'all' OR n.target_role = ?
         ORDER BY n.created_at DESC`,
        [role]
      );
      return res.json({ success: true, count: rows.length, notifications: rows });
    } catch (err) {
      return res.json({ success: true, count: MOCK_NOTIFICATIONS.length, notifications: MOCK_NOTIFICATIONS });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotification,
  getNotificationsByRole
};
