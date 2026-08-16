import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Bell, Megaphone } from 'lucide-react';
import api from '../../services/api';

const ParentAnnouncements = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications?role=parent');
      if (res.data.success) {
        setNotifications(res.data.notifications || []);
      }
    } catch (err) {
      setNotifications([
        { id: 1, title: 'Welcome to Smart Classroom Platform!', message: 'We are excited to launch our upgraded interactive learning portal.', created_at: '2026-08-01 10:00:00', creator_name: 'System Administrator' },
        { id: 2, title: 'Midterm Parent-Teacher Meeting (PTM)', message: 'The quarterly PTM is scheduled for Saturday at 10 AM in Auditorium A.', created_at: '2026-08-05 14:30:00', creator_name: 'Dr. Robert Vance' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner label="Fetching School Notices..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          School Announcements & Parent Notices
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Official broadcasts from school administration and departmental faculty.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-600" /> {n.title}
              </h3>
              <span className="text-[10px] text-slate-400">{n.created_at}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
            <p className="text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
              Broadcasted by: {n.creator_name || 'School Office'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentAnnouncements;
