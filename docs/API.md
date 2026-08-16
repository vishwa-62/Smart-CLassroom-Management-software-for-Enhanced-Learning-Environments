# Smart Classroom Management Software - REST API Documentation

This document outlines all RESTful API endpoints, request schemas, authorization rules, and sample JSON responses for the backend application.

Base URL: `http://localhost:5000/api`

---

## Table of Contents
1. [Authentication APIs](#1-authentication-apis)
2. [Student APIs](#2-student-apis)
3. [Teacher APIs](#3-teacher-apis)
4. [Classroom APIs](#4-classroom-apis)
5. [Subject APIs](#5-subject-apis)
6. [Attendance & QR Scan APIs](#6-attendance--qr-scan-apis)
7. [Assignment & Submission APIs](#7-assignment--submission-apis)
8. [Timetable APIs](#8-timetable-apis)
9. [Exam Marks & Report Cards](#9-exam-marks--report-cards)
10. [Notification & Announcement APIs](#10-notification--announcement-apis)
11. [Study Material APIs](#11-study-material-apis)

---

## 1. Authentication APIs

### `POST /auth/register`
Registers a new user account (Admin, Teacher, Student, or Parent).

**Request Body:**
```json
{
  "full_name": "Alex Johnson",
  "email": "alex.johnson@student.edu",
  "password": "Password123!",
  "role": "student",
  "phone": "+1-555-0201"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 5,
    "full_name": "Alex Johnson",
    "email": "alex.johnson@student.edu",
    "role": "student",
    "phone": "+1-555-0201"
  }
}
```

### `POST /auth/login`
Authenticates a user and returns a Bearer JWT token.

**Request Body:**
```json
{
  "email": "admin@smartclassroom.edu",
  "password": "Password123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "full_name": "System Administrator",
    "email": "admin@smartclassroom.edu",
    "role": "admin"
  }
}
```

### `GET /auth/profile`
Retrieves currently authenticated user details.
*Header:* `Authorization: Bearer <token>`

---

## 2. Student APIs

### `GET /students`
*Auth:* Bearer Token  
Retrieves full list of enrolled students.

### `GET /students/:id`
*Auth:* Bearer Token  
Returns single student profile with classroom mapping and roll number.

### `POST /students`
*Auth:* Bearer Token (Roles: Admin, Teacher)  
Enrolls a new student into a classroom.

**Request Body:**
```json
{
  "full_name": "Sophia Wilson",
  "email": "sophia.wilson@student.edu",
  "classroom_id": 1,
  "gender": "female",
  "phone": "+1-555-0204"
}
```

---

## 6. Attendance & QR Scan APIs

### `POST /attendance`
*Auth:* Bearer Token (Roles: Admin, Teacher)  
Bulk marks attendance for a classroom section.

**Request Body:**
```json
{
  "classroom_id": 1,
  "date": "2026-08-08",
  "attendance_records": [
    { "student_id": 1, "status": "present", "remarks": "On time" },
    { "student_id": 2, "status": "absent", "remarks": "Medical leave" }
  ]
}
```

### `POST /attendance/qr-verify`
*Auth:* Bearer Token (Roles: Admin, Teacher)  
Verifies student badge QR token and logs instant attendance.

**Request Body:**
```json
{
  "qr_code": "QR-STU-2025-001",
  "classroom_id": 1
}
```

---

## 9. Exam Marks & Report Cards

### `GET /marks/report-card/:studentId`
*Auth:* Bearer Token  
Generates digital report card dataset including subject score breakdown, cumulative GPA percentage, grade standing, and issue date.

---

## HTTP Status Codes
* `200 OK`: Successful operation
* `201 Created`: Resource successfully created
* `400 Bad Request`: Validation failure or missing payload parameters
* `401 Unauthorized`: Missing or invalid JWT Bearer token
* `403 Forbidden`: User role permissions insufficient
* `404 Not Found`: Target entity missing
* `500 Internal Server Error`: Backend runtime exception
