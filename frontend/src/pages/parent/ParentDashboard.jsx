import React, { useState } from 'react';
import StatCard from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { Users, CheckSquare, Award, Bell, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParentDashboard = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState('Alex Johnson');

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-900 via-brand-900 to-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Parent Monitoring Portal</span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">
            Welcome, {user?.full_name || 'David Johnson'}!
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Monitoring Academic Progress for <strong className="text-amber-300">{selectedChild}</strong> (Grade 10-A)
          </p>
        </div>

        {/* Child Switcher Dropdown */}
        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/20">
          <Users className="w-4 h-4 text-amber-400" />
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
          >
            <option value="Alex Johnson" className="text-slate-900">Child: Alex Johnson (Grade 10)</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Child Attendance" value="92.5%" change="Good Regularity" changeType="positive" icon={CheckSquare} color="green" />
        <StatCard title="Exam Average" value="90.75%" change="Grade A+" changeType="positive" icon={Award} color="purple" />
        <StatCard title="Teacher Remarks" value="Exemplary" change="Active Listener" changeType="positive" icon={Shield} color="blue" />
        <StatCard title="School Notices" value="3 Unread" change="Updated Today" changeType="positive" icon={Bell} color="amber" />
      </div>

      {/* Navigation Shortcut Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <Link to="/parent/attendance" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-3 w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Attendance Monitor</h3>
          <p className="text-xs text-slate-500">Track daily student presence & absences</p>
        </Link>

        <Link to="/parent/marks" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-3 w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Exam Report Cards</h3>
          <p className="text-xs text-slate-500">View midterm grades & teacher notes</p>
        </Link>

        <Link to="/parent/announcements" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="p-3 w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">School Announcements</h3>
          <p className="text-xs text-slate-500">Read principal & faculty notices</p>
        </Link>

      </div>

    </div>
  );
};

export default ParentDashboard;
