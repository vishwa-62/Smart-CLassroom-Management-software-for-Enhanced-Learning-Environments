import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Calendar, Clock, MapPin } from 'lucide-react';
import api from '../../services/api';

const StudentTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await api.get('/timetable');
      if (res.data.success) {
        setTimetable(res.data.timetable || []);
      }
    } catch (err) {
      setTimetable([
        { id: 1, subject_name: 'Data Structures & Algorithms', teacher_name: 'Dr. Robert Vance', day_of_week: 'Monday', start_time: '09:00:00', end_time: '10:30:00', room_name: 'Lab 101' },
        { id: 2, subject_name: 'Web Engineering & Node.js', teacher_name: 'Prof. Sarah Jenkins', day_of_week: 'Monday', start_time: '10:45:00', end_time: '12:15:00', room_name: 'Lab 101' },
        { id: 3, subject_name: 'Data Structures & Algorithms', teacher_name: 'Dr. Robert Vance', day_of_week: 'Wednesday', start_time: '09:00:00', end_time: '10:30:00', room_name: 'Lab 101' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading Timetable..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Weekly Class Routine
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Weekly schedule grid and lecture hall locations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => {
          const slots = timetable.filter(t => t.day_of_week === day);
          return (
            <div key={day} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-600" /> {day}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {slots.length} Lectures
                </span>
              </div>

              <div className="space-y-2">
                {slots.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">No scheduled lectures</p>
                ) : (
                  slots.map((s) => (
                    <div key={s.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {s.start_time} - {s.end_time}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{s.subject_name}</h4>
                      <p className="text-[11px] text-slate-500">{s.teacher_name} &bull; {s.room_name || 'Lab 101'}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentTimetable;
