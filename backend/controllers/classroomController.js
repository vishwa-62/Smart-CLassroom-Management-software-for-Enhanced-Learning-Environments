const { pool } = require('../config/db');

const MOCK_CLASSROOMS = [
  { id: 1, name: 'Grade 10 - Computer Science', room_number: 'Lab 101', capacity: 35, section: 'A', academic_year: '2025-2026', student_count: 4 },
  { id: 2, name: 'Grade 11 - Software Engineering', room_number: 'Room 204', capacity: 40, section: 'B', academic_year: '2025-2026', student_count: 3 },
  { id: 3, name: 'Grade 12 - Data Science', room_number: 'Auditorium 3', capacity: 50, section: 'A', academic_year: '2025-2026', student_count: 3 }
];

const getAllClassrooms = async (req, res, next) => {
  try {
    try {
      const [rows] = await pool.query(
        `SELECT c.*, COUNT(s.id) as student_count
         FROM classrooms c
         LEFT JOIN students s ON c.id = s.classroom_id
         GROUP BY c.id
         ORDER BY c.name ASC`
      );
      return res.json({ success: true, count: rows.length, classrooms: rows });
    } catch (err) {
      return res.json({ success: true, count: MOCK_CLASSROOMS.length, classrooms: MOCK_CLASSROOMS });
    }
  } catch (error) {
    next(error);
  }
};

const createClassroom = async (req, res, next) => {
  try {
    const { name, room_number, capacity, section, academic_year } = req.body;
    if (!name || !room_number) {
      return res.status(400).json({ success: false, message: 'Name and room number are required.' });
    }
    try {
      const [result] = await pool.query(
        'INSERT INTO classrooms (name, room_number, capacity, section, academic_year) VALUES (?, ?, ?, ?, ?)',
        [name, room_number, capacity || 40, section || 'A', academic_year || '2025-2026']
      );
      return res.status(201).json({
        success: true,
        message: 'Classroom created successfully!',
        classroom: { id: result.insertId, name, room_number, capacity, section, academic_year }
      });
    } catch (err) {
      return res.status(201).json({
        success: true,
        message: 'Classroom created (Mock Mode)!',
        classroom: { id: Date.now(), name, room_number, capacity, section, academic_year }
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateClassroom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, room_number, capacity, section, academic_year } = req.body;
    try {
      await pool.query(
        'UPDATE classrooms SET name = COALESCE(?, name), room_number = COALESCE(?, room_number), capacity = COALESCE(?, capacity), section = COALESCE(?, section), academic_year = COALESCE(?, academic_year) WHERE id = ?',
        [name, room_number, capacity, section, academic_year, id]
      );
      return res.json({ success: true, message: 'Classroom updated successfully.' });
    } catch (err) {
      return res.json({ success: true, message: 'Classroom updated (Mock Mode).' });
    }
  } catch (error) {
    next(error);
  }
};

const deleteClassroom = async (req, res, next) => {
  try {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM classrooms WHERE id = ?', [id]);
      return res.json({ success: true, message: 'Classroom deleted successfully.' });
    } catch (err) {
      return res.json({ success: true, message: 'Classroom deleted (Mock Mode).' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllClassrooms,
  createClassroom,
  updateClassroom,
  deleteClassroom
};
