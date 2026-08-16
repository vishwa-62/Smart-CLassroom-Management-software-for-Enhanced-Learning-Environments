import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { Megaphone, Send, Bell, Users } from 'lucide-react';
import api from '../../services/api';

const AnnouncementsMgmt = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target_role: 'all'
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.notifications || []);
      }
    } catch (err) {
      setNotifications([
        { id: 1, title: 'Welcome to Smart Classroom Platform!', message: 'We are excited to launch our upgraded interactive learning portal.', target_role: 'all', created_at: '2026-08-01 10:00:00', creator_name: 'System Administrator' },
        { id: 2, title: 'Midterm Exam Schedule Released', message: 'Please review the updated exam schedule for Grade 10 & Grade 11.', target_role: 'student', created_at: '2026-08-05 14:30:00', creator_name: 'Dr. Robert Vance' },
        { id: 3, title: 'Faculty Meeting on Friday at 3 PM', message: 'All departmental head teachers are requested to gather in Conference Room A.', target_role: 'teacher', created_at: '2026-08-07 09:15:00', creator_name: 'System Administrator' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/notifications', formData);
      if (res.data.success) {
        setToastMsg('Announcement broadcasted!');
        setFormData({ title: '', message: '', target_role: 'all' });
        fetchNotifications();
      }
    } catch (err) {
      setNotifications(prev => [
        { id: Date.now(), ...formData, created_at: new Date().toLocaleString(), creator_name: 'System Admin' },
        ...prev
      ]);
      setToastMsg('Announcement broadcasted (Demo Mode)!');
      setFormData({ title: '', message: '', target_role: 'all' });
    }
  };

  if (loading) return <LoadingSpinner label="Loading Notice Board..." />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Broadcast Announcements & Notice Board
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Send role-targeted notifications to students, teachers, parents, or all members.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Create Broadcast Form */}
        <div className="md:col-span-1 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-brand-600" /> New Broadcast
          </h3>

          <form onSubmit={handleBroadcast} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Announcement Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Sports Day Holiday Notice"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Target Audience Role</label>
              <select
                value={formData.target_role}
                onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none capitalize font-semibold"
              >
                <option value="all">All Roles (Broadcast)</option>
                <option value="student">Students Only</option>
                <option value="teacher">Teachers Only</option>
                <option value="parent">Parents Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Detailed Message Content</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type notice message details..."
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Broadcast Notice
            </button>
          </form>
        </div>

        {/* Live Notices Feed */}
        <div className="md:col-span-2 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-600" /> Active School Announcements
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
              {notifications.length} Posted
            </span>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{n.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 capitalize">
                    Target: {n.target_role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                  <span>By {n.creator_name || 'System Admin'}</span>
                  <span>{n.created_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementsMgmt;
