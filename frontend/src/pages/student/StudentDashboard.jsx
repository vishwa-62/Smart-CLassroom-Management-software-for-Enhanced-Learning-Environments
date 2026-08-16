import React, { useState, useEffect } from 'react';
import StatCard from '../../components/common/StatCard';
import PDFReportCardModal from '../../components/features/PDFReportCardModal';
import Toast from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { Calendar, CheckSquare, FileText, FolderDown, Award, Printer, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [reportCardData, setReportCardData] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchReportCard();
  }, []);

  const fetchReportCard = async () => {
    try {
      const res = await api.get(`/marks/report-card/${user?.id || 1}`);
      if (res.data.success) {
        setReportCardData(res.data.reportCard);
      }
    } catch (err) {
      setReportCardData({
        student: { full_name: user?.full_name || 'Alex Johnson', roll_number: 'STU-2025-001', classroom_name: 'Grade 10 - Computer Science', academic_year: '2025-2026' },
        marks: [
          { subject_code: 'CS-101', subject_name: 'Data Structures & Algorithms', exam_name: 'Midterm Exam', marks_obtained: 92.5, max_marks: 100 },
          { subject_code: 'CS-102', subject_name: 'Web Engineering & Node.js', exam_name: 'Midterm Exam', marks_obtained: 89.0, max_marks: 100 }
        ],
        totalObtained: 181.5,
        totalMax: 200,
        percentage: '90.75',
        grade: 'A+',
        issued_date: new Date().toLocaleDateString()
      });
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
      <PDFReportCardModal isOpen={isReportCardOpen} onClose={() => setIsReportCardOpen(false)} reportCard={reportCardData} />

      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-brand-900 to-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Student Portal</span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">
            Welcome, {user?.full_name || 'Alex Johnson'}!
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Roll Number: STU-2025-001 &bull; Grade 10 - Computer Science
          </p>
        </div>

        <button
          onClick={() => setIsReportCardOpen(true)}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition hover:scale-105"
        >
          <Printer className="w-4 h-4" /> Download PDF Report Card
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance Rate" value="92%" change="Excellent Status" changeType="positive" icon={CheckSquare} color="green" />
        <StatCard title="Pending Homework" value="2 Items" change="Due this week" changeType="positive" icon={FileText} color="amber" />
        <StatCard title="Term Grade" value="A+ (90.7%)" change="Top 5 in Batch" changeType="positive" icon={Award} color="purple" />
        <StatCard title="Course Credits" value="18 Earned" change="On Track" changeType="positive" icon={Calendar} color="blue" />
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link to="/student/timetable" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-3 w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Class Timetable</h3>
          <p className="text-xs text-slate-500">View daily routines and period timings</p>
        </Link>

        <Link to="/student/assignments" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-3 w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Submit Assignments</h3>
          <p className="text-xs text-slate-500">Attach GitHub links & homework solutions</p>
        </Link>

        <Link to="/student/materials" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-3 w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <FolderDown className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Study Materials</h3>
          <p className="text-xs text-slate-500">Download lecture PDF slides & notes</p>
        </Link>

      </div>
    </div>
  );
};

export default StudentDashboard;
