import React, { useState, useEffect } from 'react';
import StatCard from '../../components/common/StatCard';
import AttendanceChart from '../../components/charts/AttendanceChart';
import PerformanceChart from '../../components/charts/PerformanceChart';
import GradeDistributionChart from '../../components/charts/GradeDistributionChart';
import ExportCSVButton from '../../components/features/ExportCSVButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Users, UserCheck, BookOpen, FileSpreadsheet, Bell, TrendingUp, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 10,
    totalTeachers: 3,
    totalClassrooms: 3,
    totalSubjects: 5,
    avgAttendance: '91.5%'
  });
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'Attendance', detail: 'Attendance marked for Grade 10-A (CS-101)', time: '10 mins ago', status: 'Success' },
    { id: 2, type: 'Assignment', detail: 'New assignment posted by Dr. Robert Vance', time: '1 hour ago', status: 'Notice' },
    { id: 3, type: 'Enrollment', detail: 'New student Alex Johnson enrolled in Grade 10', time: '3 hours ago', status: 'Success' },
    { id: 4, type: 'Alert', detail: 'Low attendance alert triggered for Daniel Miller (65%)', time: 'Yesterday', status: 'Warning' }
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [stRes, tcRes, clRes, subRes] = await Promise.all([
        api.get('/students').catch(() => ({ data: { count: 10 } })),
        api.get('/teachers').catch(() => ({ data: { count: 3 } })),
        api.get('/classrooms').catch(() => ({ data: { count: 3 } })),
        api.get('/subjects').catch(() => ({ data: { count: 5 } }))
      ]);

      setStats({
        totalStudents: stRes.data.count || 10,
        totalTeachers: tcRes.data.count || 3,
        totalClassrooms: clRes.data.count || 3,
        totalSubjects: subRes.data.count || 5,
        avgAttendance: '91.5%'
      });
    } catch (err) {
      console.warn('Using default admin stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading Admin Analytics..." />;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            System metrics, attendance tracking, and faculty directory management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCSVButton data={recentActivities} filename="admin_activities_log.csv" label="Export Activity Logs" />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={stats.totalStudents} change="+12% this term" changeType="positive" icon={UserCheck} color="purple" />
        <StatCard title="Active Faculty" value={stats.totalTeachers} change="100% Onboarding" changeType="positive" icon={Users} color="blue" />
        <StatCard title="Classrooms" value={stats.totalClassrooms} change="3 Batches" changeType="positive" icon={BookOpen} color="amber" />
        <StatCard title="Avg Attendance" value={stats.avgAttendance} change="+3.2% vs last month" changeType="positive" icon={TrendingUp} color="green" />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Attendance Trend */}
        <div className="lg:col-span-2 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Attendance Overview</h3>
              <p className="text-xs text-slate-500">Student presence vs absence trends</p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/60 rounded-full border border-brand-200 dark:border-brand-800">
              Live Feed
            </span>
          </div>
          <AttendanceChart />
        </div>

        {/* Grade Breakdown Pie */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Grade Standing Distribution</h3>
            <p className="text-xs text-slate-500">Midterm evaluation breakdown</p>
          </div>
          <GradeDistributionChart />
        </div>

      </div>

      {/* Performance Bar Chart & Recent Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Subject-wise Average Scores</h3>
            <p className="text-xs text-slate-500">Average percentage achieved per course</p>
          </div>
          <PerformanceChart />
        </div>

        {/* Activity Logs Table */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">System Activity Stream</h3>
            <Bell className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-72">
            {recentActivities.map((act) => (
              <div key={act.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 flex items-start gap-3">
                {act.status === 'Warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0"></div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{act.detail}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
