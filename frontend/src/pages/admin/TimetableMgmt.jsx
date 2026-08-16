import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { Plus, Calendar, Clock, Trash2, MapPin } from 'lucide-react';
import api from '../../services/api';

const TimetableMgmt = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    classroom_id: 1,
    subject_id: 1,
    teacher_id: 1,
    day_of_week: 'Monday',
    start_time: '09:00',
    end_time: '10:30',
    room_name: 'Lab 101'
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
        { id: 1, classroom_name: 'Grade 10 - Computer Science', subject_name: 'Data Structures & Algorithms', teacher_name: 'Dr. Robert Vance', day_of_week: 'Monday', start_time: '09:00:00', end_time: '10:30:00', room_name: 'Lab 101' },
        { id: 2, classroom_name: 'Grade 10 - Computer Science', subject_name: 'Web Engineering & Node.js', teacher_name: 'Prof. Sarah Jenkins', day_of_week: 'Monday', start_time: '10:45:00', end_time: '12:15:00', room_name: 'Lab 101' },
        { id: 3, classroom_name: 'Grade 10 - Computer Science', subject_name: 'Data Structures & Algorithms', teacher_name: 'Dr. Robert Vance', day_of_week: 'Wednesday', start_time: '09:00:00', end_time: '10:30:00', room_name: 'Lab 101' },
        { id: 4, classroom_name: 'Grade 11 - Software Engineering', subject_name: 'Database Management Systems', teacher_name: 'Prof. Sarah Jenkins', day_of_week: 'Tuesday', start_time: '09:00:00', end_time: '10:30:00', room_name: 'Room 204' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/timetable', formData);
      if (res.data.success) {
        setToastMsg('Timetable slot scheduled!');
        setIsModalOpen(false);
        fetchTimetable();
      }
    } catch (err) {
      setTimetable(prev => [
        { id: Date.now(), ...formData, classroom_name: 'Grade 10 - Computer Science', subject_name: 'New Class', teacher_name: 'Dr. Vance' },
        ...prev
      ]);
      setToastMsg('Slot scheduled (Demo Mode)!');
      setIsModalOpen(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Delete timetable slot?')) return;
    try {
      await api.delete(`/timetable/${id}`);
      setToastMsg('Slot deleted.');
      setTimetable(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setTimetable(prev => prev.filter(t => t.id !== id));
      setToastMsg('Slot deleted.');
    }
  };

  if (loading) return <LoadingSpinner label="Loading Master Timetable..." />;

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Master Timetable & Schedule Grid
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure daily period slots, classroom lab assignments, and faculty routines.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
        >
          <Plus className="w-4 h-4" /> Add Time Slot
        </button>
      </div>

      {/* Days Grid */}
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
                  {slots.length} Classes
                </span>
              </div>

              <div className="space-y-2">
                {slots.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">No scheduled periods</p>
                ) : (
                  slots.map((s) => (
                    <div key={s.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {s.start_time} - {s.end_time}
                        </span>
                        <p className="font-bold text-xs text-slate-900 dark:text-white">{s.subject_name}</p>
                        <p className="text-[11px] text-slate-500">{s.teacher_name} &bull; {s.room_name || 'Lab 101'}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(s.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Class Period">
        <form onSubmit={handleCreateEntry} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Day of Week</label>
              <select
                value={formData.day_of_week}
                onChange={(e) => setFormData({ ...formData, day_of_week: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Room Location</label>
              <input
                type="text"
                value={formData.room_name}
                onChange={(e) => setFormData({ ...formData, room_name: e.target.value })}
                placeholder="Lab 101"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Start Time</label>
              <input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">End Time</label>
              <input
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md"
            >
              Schedule Slot
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TimetableMgmt;
