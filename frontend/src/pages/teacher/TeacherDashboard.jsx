import React, { useState, useEffect } from 'react';
import StatCard from '../../components/common/StatCard';
import QRCodeModal from '../../components/features/QRCodeModal';
import Toast from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { Calendar, CheckSquare, FileText, Upload, Award, QrCode, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const todayClasses = [
    { id: 1, subject: 'Data Structures & Algorithms', code: 'CS-101', class: 'Grade 10 - CS', time: '09:00 AM - 10:30 AM', room: 'Lab 101', status: 'Upcoming' },
    { id: 2, subject: 'Web Engineering & Node.js', code: 'CS-102', class: 'Grade 10 - CS', time: '10:45 AM - 12:15 PM', room: 'Lab 101', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
      <QRCodeModal 
        isOpen={isQrModalOpen} 
        onClose={() => setIsQrModalOpen(false)} 
        onVerified={(student) => setToastMsg(`Attendance verified for ${student?.full_name || 'Alex Johnson'}`)}
      />

      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-brand-900 to-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Faculty Portal</span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">
            Welcome back, {user?.full_name || 'Dr. Vance'}!
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            You have {todayClasses.length} lectures scheduled for today.
          </p>
        </div>

        <button
          onClick={() => setIsQrModalOpen(true)}
          className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/30 flex items-center gap-2 transition hover:scale-105"
        >
          <QrCode className="w-4 h-4" /> Scan Student QR Pass
        </button>
      </div>

      {/* Action Shortcuts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/teacher/attendance" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-2.5 w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Mark Attendance</h3>
          <p className="text-xs text-slate-500">1-Click batch attendance marking</p>
        </Link>

        <Link to="/teacher/assignments" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-2.5 w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Post Assignment</h3>
          <p className="text-xs text-slate-500">Upload homework & grade work</p>
        </Link>

        <Link to="/teacher/materials" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-2.5 w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Upload className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Upload Notes</h3>
          <p className="text-xs text-slate-500">Share lecture PDF documents</p>
        </Link>

        <Link to="/teacher/marks" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-2.5 w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Enter Exam Marks</h3>
          <p className="text-xs text-slate-500">Input midterm & test scores</p>
        </Link>
      </div>

      {/* Today's Schedule Table */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Today's Class Schedule</h3>
            <p className="text-xs text-slate-500">Your assigned lectures for today</p>
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="space-y-3">
          {todayClasses.map((cls) => (
            <div key={cls.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 font-mono">{cls.code} &bull; {cls.class}</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cls.subject}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> {cls.time} &bull; {cls.room}
                </p>
              </div>

              <Link
                to="/teacher/attendance"
                className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs self-start sm:self-center transition"
              >
                Mark Attendance
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TeacherDashboard;
