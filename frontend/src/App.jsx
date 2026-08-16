import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherMgmt from './pages/admin/TeacherMgmt';
import StudentMgmt from './pages/admin/StudentMgmt';
import ClassroomMgmt from './pages/admin/ClassroomMgmt';
import SubjectMgmt from './pages/admin/SubjectMgmt';
import TimetableMgmt from './pages/admin/TimetableMgmt';
import AnnouncementsMgmt from './pages/admin/AnnouncementsMgmt';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AttendanceForm from './pages/teacher/AttendanceForm';
import AssignmentMgmt from './pages/teacher/AssignmentMgmt';
import MaterialUpload from './pages/teacher/MaterialUpload';
import MarksEntry from './pages/teacher/MarksEntry';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentTimetable from './pages/student/StudentTimetable';
import AttendanceReport from './pages/student/AttendanceReport';
import AssignmentsView from './pages/student/AssignmentsView';
import MaterialDownload from './pages/student/MaterialDownload';
import ReportCardView from './pages/student/ReportCardView';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ChildAttendance from './pages/parent/ChildAttendance';
import ChildMarks from './pages/parent/ChildMarks';
import ParentAnnouncements from './pages/parent/ParentAnnouncements';

// Protected Route Wrapper
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner label="Verifying authorization..." />;
  if (!user) return <Navigate to="/login" replace />;

  const userRole = user.role?.toLowerCase();
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

  if (allowedRoles.length > 0 && !normalizedAllowed.includes(userRole)) {
    // Redirect to respective dashboard
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
    if (userRole === 'teacher') return <Navigate to="/teacher" replace />;
    if (userRole === 'student') return <Navigate to="/student" replace />;
    if (userRole === 'parent') return <Navigate to="/parent" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// Dashboard Layout Wrapper with Top Navbar + Left Sidebar
const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)} />
      
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        <Sidebar mobileOpen={mobileSidebarOpen} onCloseMobile={() => setMobileSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-full">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/teachers" element={<TeacherMgmt />} />
              <Route path="/admin/students" element={<StudentMgmt />} />
              <Route path="/admin/classrooms" element={<ClassroomMgmt />} />
              <Route path="/admin/subjects" element={<SubjectMgmt />} />
              <Route path="/admin/timetable" element={<TimetableMgmt />} />
              <Route path="/admin/announcements" element={<AnnouncementsMgmt />} />
            </Route>
          </Route>

          {/* Teacher Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['teacher', 'admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/attendance" element={<AttendanceForm />} />
              <Route path="/teacher/assignments" element={<AssignmentMgmt />} />
              <Route path="/teacher/materials" element={<MaterialUpload />} />
              <Route path="/teacher/marks" element={<MarksEntry />} />
            </Route>
          </Route>

          {/* Student Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/timetable" element={<StudentTimetable />} />
              <Route path="/student/attendance" element={<AttendanceReport />} />
              <Route path="/student/assignments" element={<AssignmentsView />} />
              <Route path="/student/materials" element={<MaterialDownload />} />
              <Route path="/student/report-card" element={<ReportCardView />} />
            </Route>
          </Route>

          {/* Parent Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['parent', 'admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/parent/attendance" element={<ChildAttendance />} />
              <Route path="/parent/marks" element={<ChildMarks />} />
              <Route path="/parent/announcements" element={<ParentAnnouncements />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
