# 🎓 Smart Classroom Management Software for Enhanced Learning Environments

A full-stack web application designed for modern educational institutions, supporting **Administrators**, **Teachers**, **Students**, and **Parents**. Features interactive role-based dashboards, automated attendance with QR Code scanner support, digital assignment submission & grading, printable PDF report card generation, downloadable study materials, master timetable scheduling, broadcast notices, dark mode, and CSV exports.

---

## 🚀 Key System Features

### 🛡️ Admin Portal
* **Faculty Directory**: Add, edit, and manage teacher profiles, qualifications, and department assignments.
* **Student Roster**: Track enrolled students, roll numbers, assigned classrooms, and contact details.
* **Classroom Management**: Define physical room locations, maximum seating capacities, and academic years.
* **Course Syllabus**: Map subjects, credit hours, and lead instructors.
* **Master Timetable**: Schedule weekly class routines across classrooms.
* **Announcements**: Broadcast notices to target audience roles.

### 👩‍🏫 Teacher Portal
* **1-Click Attendance Checklist**: Fast batch attendance marking with present/absent/late toggles.
* **QR Code Scanner**: Instant QR badge scan verification for student check-in.
* **Assignment Publication**: Post homework assignments with due dates and total points.
* **Submission Grading**: Review student code links/documents, enter scores (0-100), and write feedback.
* **Study Material Upload**: Share lecture presentation slides and PDF reference materials.
* **Exam Marks Entry**: Input midterm and final exam scores.

### 👨‍🎓 Student Portal
* **Class Routine**: View personal weekly schedule and room locations.
* **Attendance Rate Tracker**: Monitor percentage dial and daily attendance history logs.
* **Homework Submissions**: Turn in project solutions with GitHub/Google Drive links.
* **Course Resources**: Download PDF lecture slides shared by instructors.
* **Digital Report Card**: View cumulative GPA percentage, letter grade standing, and print official PDF transcript.

### 👨‍👩‍👧 Parent Portal
* **Multi-Child Switcher**: Monitor academic performance across enrolled children.
* **Real-time Attendance Tracking**: Review daily attendance status recorded by teachers.
* **Exam Scorecard**: Track exam marks, total score, and teacher remarks.
* **School Notices**: Stay updated with principal and school office announcements.

---

## 🛠️ Technology Stack

### Frontend
* **Core**: React 18 + Vite
* **Routing**: React Router DOM v6
* **Styling**: Tailwind CSS + Modern Glassmorphism Design System
* **Icons**: Lucide React
* **Analytics**: Recharts (Area, Bar, & Pie Charts)
* **HTTP Client**: Axios

### Backend
* **Runtime**: Node.js + Express.js
* **Database Driver**: `mysql2/promise` connection pool
* **Security**: JWT (JSON Web Tokens), bcryptjs password hashing, Helmet, CORS
* **Architecture**: RESTful APIs with MVC (Model-View-Controller) structure

### Database
* **Database Engine**: MySQL 8.0+
* **Schema**: 15 Normalized Relational Tables with Indexes and Foreign Key Constraints

---

## 📁 Directory Architecture

```
smart-classroom/
├── database/
│   ├── schema.sql           # MySQL database DDL schema creation script
│   └── seed.sql             # Demo seed data (Admin, Teachers, Students, Parents, Schedules, Marks)
├── backend/
│   ├── config/
│   │   └── db.js            # MySQL connection pool (mysql2/promise)
│   ├── controllers/         # Auth, Student, Teacher, Classroom, Attendance, Assignment, Marks, etc.
│   ├── middleware/          # JWT verification & RBAC role authorization
│   ├── routes/              # Express API route modules
│   ├── .env.example         # Environment template
│   ├── package.json
│   └── server.js            # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # Common UI, Recharts analytics, QR & PDF feature modals
│   │   ├── context/         # AuthContext & ThemeContext
│   │   ├── pages/           # Public, Admin, Teacher, Student, and Parent dashboard views
│   │   ├── services/        # Axios API client
│   │   ├── App.jsx          # Protected route setup
│   │   ├── main.jsx
│   │   └── index.css        # Tailwind CSS directives & glassmorphism
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── docs/
│   └── API.md               # REST API documentation
└── README.md
```

---

## 🔑 Default Demo Login Credentials

You can test all 4 role portals immediately using the pre-seeded credentials below:

| Role | Email Address | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@smartclassroom.edu` | `Password123!` |
| **Teacher** | `robert.vance@smartclassroom.edu` | `Password123!` |
| **Student** | `alex.johnson@student.edu` | `Password123!` |
| **Parent** | `david.johnson@parent.com` | `Password123!` |

*(Note: The login page also features 1-click demo filler buttons for instant access).*

---

## ⚙️ Quickstart Local Setup Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **MySQL Server**: v8.0 or higher (or XAMPP/WAMP MySQL)

### 1. Database Setup
Execute the SQL scripts in your MySQL client (e.g. MySQL Workbench, phpMyAdmin, or CLI):

```bash
# Import schema structure
mysql -u root -p < database/schema.sql

# Import seed data
mysql -u root -p < database/seed.sql
```

### 2. Backend Installation & Server Execution
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment configuration file
cp .env.example .env

# Start Node.js API server (Runs on http://localhost:5000)
npm run dev
```

### 3. Frontend Installation & Execution
Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server (Runs on http://localhost:5173)
npm run dev
```

Now open **`http://localhost:5173`** in your browser!

---

## ☁️ Production Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Push project to GitHub repository.
2. Connect repository to Vercel/Netlify.
3. Set **Root Directory** to `frontend`.
4. Set **Build Command** to `npm run build`.
5. Set **Output Directory** to `dist`.

### Backend Deployment (Render / Railway)
1. Set **Root Directory** to `backend`.
2. Set **Build Command** to `npm install`.
3. Set **Start Command** to `node server.js`.
4. Configure Environment Variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`).

### Cloud MySQL Hosting (PlanetScale / Aiven / AWS RDS)
1. Provision cloud MySQL instance.
2. Import `database/schema.sql` and `database/seed.sql`.
3. Update backend `.env` variables with cloud database credentials.

---

## 📜 License & Credits
Built for educational environments and academic final year project demonstrations.
