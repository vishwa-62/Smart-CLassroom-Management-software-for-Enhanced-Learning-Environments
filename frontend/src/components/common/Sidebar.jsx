import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, UserCheck, BookOpen, Calendar, 
  FileText, Award, Bell, QrCode, FileSpreadsheet, Settings, 
  FolderDown, Upload, CheckSquare, Megaphone, Shield
} from 'lucide-react';

const Sidebar = ({ mobileOpen, onCloseMobile }) => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || 'student';

  const adminNav = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Teachers Directory', path: '/admin/teachers', icon: Users },
    { label: 'Students Directory', path: '/admin/students', icon: UserCheck },
    { label: 'Classrooms', path: '/admin/classrooms', icon: BookOpen },
    { label: 'Subjects Syllabus', path: '/admin/subjects', icon: FileSpreadsheet },
    { label: 'Master Timetable', path: '/admin/timetable', icon: Calendar },
    { label: 'Announcements', path: '/admin/announcements', icon: Megaphone }
  ];

  const teacherNav = [
    { label: 'Dashboard', path: '/teacher', icon: LayoutDashboard },
    { label: 'Mark Attendance', path: '/teacher/attendance', icon: CheckSquare },
    { label: 'Assignments', path: '/teacher/assignments', icon: FileText },
    { label: 'Study Materials', path: '/teacher/materials', icon: Upload },
    { label: 'Marks Entry', path: '/teacher/marks', icon: Award }
  ];

  const studentNav = [
    { label: 'My Dashboard', path: '/student', icon: LayoutDashboard },
    { label: 'Class Schedule', path: '/student/timetable', icon: Calendar },
    { label: 'Attendance Report', path: '/student/attendance', icon: CheckSquare },
    { label: 'Pending Assignments', path: '/student/assignments', icon: FileText },
    { label: 'Study Materials', path: '/student/materials', icon: FolderDown },
    { label: 'Marks & Report Card', path: '/student/report-card', icon: Award }
  ];

  const parentNav = [
    { label: 'Parent Portal', path: '/parent', icon: LayoutDashboard },
    { label: 'Child Attendance', path: '/parent/attendance', icon: CheckSquare },
    { label: 'Child Exam Marks', path: '/parent/marks', icon: Award },
    { label: 'School Alerts', path: '/parent/announcements', icon: Bell }
  ];

  const getNavItems = () => {
    switch (role) {
      case 'admin': return adminNav;
      case 'teacher': return teacherNav;
      case 'student': return studentNav;
      case 'parent': return parentNav;
      default: return studentNav;
    }
  };

  const navItems = getNavItems();

  const sidebarContent = (
    <div className="flex flex-col h-full py-5 px-4 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Navigation Group Header */}
      <div className="mb-4 px-3">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {role} Navigation
        </span>
      </div>

      {/* Nav items list */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/admin` || item.path === `/teacher` || item.path === `/student` || item.path === `/parent`}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Role Badge Footer Card */}
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 capitalize">{role} Account</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Smart Classroom v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-50 w-64 max-w-xs h-full bg-white dark:bg-slate-900 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
