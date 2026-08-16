-- ============================================================================
-- Smart Classroom Management Software - Seed Data SQL Script
-- Default password for all seed users: Password123!
-- (Bcrypt hash: $2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J)
-- ============================================================================

USE `smart_classroom`;

-- Disable FK checks during insertion
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Insert Users (Admin, 3 Teachers, 10 Students, 5 Parents)
-- Password hash corresponds to 'Password123!'
INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`, `phone`, `avatar`, `status`) VALUES
-- Admin (ID 1)
(1, 'System Administrator', 'admin@smartclassroom.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'admin', '+1-555-0100', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', 'active'),

-- Teachers (IDs 2, 3, 4)
(2, 'Dr. Robert Vance', 'robert.vance@smartclassroom.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'teacher', '+1-555-0101', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', 'active'),
(3, 'Prof. Sarah Jenkins', 'sarah.jenkins@smartclassroom.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'teacher', '+1-555-0102', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80', 'active'),
(4, 'Michael Chen', 'michael.chen@smartclassroom.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'teacher', '+1-555-0103', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80', 'active'),

-- Students (IDs 5 to 14)
(5, 'Alex Johnson', 'alex.johnson@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0201', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80', 'active'),
(6, 'Emily Davis', 'emily.davis@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0202', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80', 'active'),
(7, 'Daniel Miller', 'daniel.miller@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0203', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80', 'active'),
(8, 'Sophia Wilson', 'sophia.wilson@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0204', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80', 'active'),
(9, 'Ethan Anderson', 'ethan.anderson@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0205', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=250&q=80', 'active'),
(10, 'Olivia Taylor', 'olivia.taylor@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0206', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80', 'active'),
(11, 'James Thomas', 'james.thomas@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0207', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80', 'active'),
(12, 'Ava Jackson', 'ava.jackson@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0208', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=250&q=80', 'active'),
(13, 'Lucas White', 'lucas.white@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0209', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80', 'active'),
(14, 'Mia Harris', 'mia.harris@student.edu', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'student', '+1-555-0210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', 'active'),

-- Parents (IDs 15 to 19)
(15, 'David Johnson', 'david.johnson@parent.com', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'parent', '+1-555-0301', NULL, 'active'),
(16, 'Laura Davis', 'laura.davis@parent.com', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'parent', '+1-555-0302', NULL, 'active'),
(17, 'Mark Miller', 'mark.miller@parent.com', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'parent', '+1-555-0303', NULL, 'active'),
(18, 'Grace Wilson', 'grace.wilson@parent.com', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'parent', '+1-555-0304', NULL, 'active'),
(19, 'Christopher Taylor', 'chris.taylor@parent.com', '$2a$10$7R6yP9tL/s90YhWwK9O3e.tV3rGk7s8r2M5W1/2b.Gk6f7E8h9I0J', 'parent', '+1-555-0305', NULL, 'active');

-- 2. Classrooms
INSERT INTO `classrooms` (`id`, `name`, `room_number`, `capacity`, `section`, `academic_year`) VALUES
(1, 'Grade 10 - Computer Science', 'Lab 101', 35, 'A', '2025-2026'),
(2, 'Grade 11 - Software Engineering', 'Room 204', 40, 'B', '2025-2026'),
(3, 'Grade 12 - Data Science', 'Auditorium 3', 50, 'A', '2025-2026');

-- 3. Teachers
INSERT INTO `teachers` (`id`, `user_id`, `employee_code`, `qualification`, `specialization`, `department`) VALUES
(1, 2, 'EMP-T101', 'Ph.D. in Computer Science', 'Algorithms & Mathematics', 'Computer Science'),
(2, 3, 'EMP-T102', 'M.Tech in Software Engineering', 'Web Technologies & DB', 'Information Technology'),
(3, 4, 'EMP-T103', 'M.Sc in Physics & Electronics', 'Hardware & IoT', 'Electronics');

-- 4. Students
INSERT INTO `students` (`id`, `user_id`, `roll_number`, `classroom_id`, `gender`, `date_of_birth`, `address`, `qr_code`) VALUES
(1, 5, 'STU-2025-001', 1, 'male', '2008-04-12', '124 Maple Street, New York, NY', 'QR-STU-2025-001'),
(2, 6, 'STU-2025-002', 1, 'female', '2008-07-22', '88 Pine Avenue, New York, NY', 'QR-STU-2025-002'),
(3, 7, 'STU-2025-003', 1, 'male', '2008-01-15', '302 Oak Lane, New York, NY', 'QR-STU-2025-003'),
(4, 8, 'STU-2025-004', 1, 'female', '2008-11-30', '15 Cedar Boulevard, New York, NY', 'QR-STU-2025-004'),
(5, 9, 'STU-2025-005', 2, 'male', '2007-09-05', '45 Elm Court, New York, NY', 'QR-STU-2025-005'),
(6, 10, 'STU-2025-006', 2, 'female', '2007-03-18', '90 Birch Way, New York, NY', 'QR-STU-2025-006'),
(7, 11, 'STU-2025-007', 2, 'male', '2007-12-01', '210 Walnut Drive, New York, NY', 'QR-STU-2025-007'),
(8, 12, 'STU-2025-008', 3, 'female', '2006-05-14', '77 Chestnut Street, New York, NY', 'QR-STU-2025-008'),
(9, 13, 'STU-2025-009', 3, 'male', '2006-08-25', '53 Spruce Road, New York, NY', 'QR-STU-2025-009'),
(10, 14, 'STU-2025-010', 3, 'female', '2006-10-10', '404 Ash Drive, New York, NY', 'QR-STU-2025-010');

-- 5. Parents
INSERT INTO `parents` (`id`, `user_id`, `occupation`) VALUES
(1, 15, 'Civil Engineer'),
(2, 16, 'Senior Accountant'),
(3, 17, 'Architect'),
(4, 18, 'Medical Doctor'),
(5, 19, 'Software Manager');

-- 6. Parent-Student Relationship
INSERT INTO `parent_student` (`parent_id`, `student_id`, `relationship`) VALUES
(1, 1, 'Father'),
(2, 2, 'Mother'),
(3, 3, 'Father'),
(4, 4, 'Mother'),
(5, 6, 'Father');

-- 7. Subjects
INSERT INTO `subjects` (`id`, `subject_name`, `subject_code`, `teacher_id`, `classroom_id`, `credits`) VALUES
(1, 'Data Structures & Algorithms', 'CS-101', 1, 1, 4),
(2, 'Web Engineering & Node.js', 'CS-102', 2, 1, 3),
(3, 'Database Management Systems', 'CS-103', 2, 2, 4),
(4, 'Computer Architecture', 'CS-104', 3, 2, 3),
(5, 'Machine Learning Basics', 'CS-105', 1, 3, 4);

-- 8. Enrollments
INSERT INTO `enrollments` (`student_id`, `classroom_id`, `enrolled_at`, `status`) VALUES
(1, 1, '2025-08-01', 'active'),
(2, 1, '2025-08-01', 'active'),
(3, 1, '2025-08-01', 'active'),
(4, 1, '2025-08-01', 'active'),
(5, 2, '2025-08-01', 'active'),
(6, 2, '2025-08-01', 'active'),
(7, 2, '2025-08-01', 'active'),
(8, 3, '2025-08-01', 'active'),
(9, 3, '2025-08-01', 'active'),
(10, 3, '2025-08-01', 'active');

-- 9. Attendance
INSERT INTO `attendance` (`student_id`, `classroom_id`, `subject_id`, `attendance_date`, `status`, `remarks`, `marked_by`) VALUES
(1, 1, 1, CURRENT_DATE(), 'present', 'On time', 2),
(2, 1, 1, CURRENT_DATE(), 'present', 'On time', 2),
(3, 1, 1, CURRENT_DATE(), 'late', '10 mins delayed', 2),
(4, 1, 1, CURRENT_DATE(), 'absent', 'Medical leave', 2),
(5, 2, 3, CURRENT_DATE(), 'present', 'Active listener', 3),
(6, 2, 3, CURRENT_DATE(), 'present', 'On time', 3),
(7, 2, 3, CURRENT_DATE(), 'present', 'On time', 3),
(8, 3, 5, CURRENT_DATE(), 'present', 'On time', 2),
(9, 3, 5, CURRENT_DATE(), 'absent', 'Unexcused', 2),
(10, 3, 5, CURRENT_DATE(), 'present', 'On time', 2);

-- 10. Assignments
INSERT INTO `assignments` (`id`, `title`, `description`, `subject_id`, `classroom_id`, `teacher_id`, `due_date`, `total_points`) VALUES
(1, 'Binary Tree Implementation', 'Implement AVL Tree balancing algorithms in JavaScript/Python with automated test suite.', 1, 1, 1, DATE_ADD(NOW(), INTERVAL 5 DAY), 100),
(2, 'RESTful Express API Setup', 'Build a simple JWT authenticated CRUD microservice for product catalog.', 2, 1, 2, DATE_ADD(NOW(), INTERVAL 7 DAY), 50),
(3, 'SQL Schema Optimization', 'Design normalized 3NF database schema for e-commerce website with indexing.', 3, 2, 2, DATE_ADD(NOW(), INTERVAL 3 DAY), 100);

-- 11. Assignment Submissions
INSERT INTO `assignment_submissions` (`assignment_id`, `student_id`, `submission_url`, `comments`, `status`, `grade`, `feedback`) VALUES
(1, 1, 'https://github.com/alexjohnson/binary-tree-lab', 'Completed bonus test cases as well.', 'graded', 95.00, 'Excellent code structure and clean Big-O complexity!'),
(1, 2, 'https://github.com/emilydavis/avl-trees', 'Submitted code with visual output.', 'graded', 88.50, 'Good logic, add more docstrings.'),
(2, 1, 'https://github.com/alexjohnson/express-jwt-api', 'Deployed on Render successfully.', 'submitted', NULL, NULL);

-- 12. Study Materials
INSERT INTO `study_materials` (`id`, `title`, `description`, `file_url`, `file_type`, `subject_id`, `classroom_id`, `uploaded_by`) VALUES
(1, 'Data Structures Lecture 01 - Recursion & Trees', 'Comprehensive slides on recursion and binary tree traversals.', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'PDF', 1, 1, 2),
(2, 'Express.js & Middleware Cheatsheet', 'Handy reference guide for routing, JWT, and custom error handling.', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'PDF', 2, 1, 3),
(3, 'MySQL Indexing Best Practices', 'Guide to B-tree indexes, execution plans, and EXPLAIN query optimization.', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'PDF', 3, 2, 3);

-- 13. Timetables
INSERT INTO `timetables` (`classroom_id`, `subject_id`, `teacher_id`, `day_of_week`, `start_time`, `end_time`, `room_name`) VALUES
(1, 1, 1, 'Monday', '09:00:00', '10:30:00', 'Lab 101'),
(1, 2, 2, 'Monday', '10:45:00', '12:15:00', 'Lab 101'),
(1, 1, 1, 'Wednesday', '09:00:00', '10:30:00', 'Lab 101'),
(2, 3, 2, 'Tuesday', '09:00:00', '10:30:00', 'Room 204'),
(2, 4, 3, 'Tuesday', '11:00:00', '12:30:00', 'Room 204'),
(3, 5, 1, 'Thursday', '13:00:00', '15:00:00', 'Auditorium 3');

-- 14. Marks
INSERT INTO `marks` (`student_id`, `subject_id`, `exam_name`, `marks_obtained`, `max_marks`, `remarks`) VALUES
(1, 1, 'Midterm Exam', 92.50, 100.00, 'Top rank in class'),
(1, 2, 'Midterm Exam', 89.00, 100.00, 'Great performance'),
(2, 1, 'Midterm Exam', 84.00, 100.00, 'Good conceptual understanding'),
(2, 2, 'Midterm Exam', 91.50, 100.00, 'Excellent code style'),
(3, 1, 'Midterm Exam', 76.00, 100.00, 'Needs practice on trees'),
(4, 1, 'Midterm Exam', 88.00, 100.00, 'Solid understanding');

-- 15. Notifications
INSERT INTO `notifications` (`title`, `message`, `target_role`, `classroom_id`, `created_by`) VALUES
('Welcome to Smart Classroom Platform!', 'We are excited to launch our upgraded interactive learning portal.', 'all', NULL, 1),
('Midterm Exam Schedule Released', 'Please review the updated exam schedule for Grade 10 & Grade 11.', 'student', 1, 1),
('Faculty Meeting on Friday at 3 PM', 'All departmental head teachers are requested to gather in Conference Room A.', 'teacher', NULL, 1);

-- Re-enable FK checks
SET FOREIGN_KEY_CHECKS = 1;
