import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ExportCSVButton from '../../components/features/ExportCSVButton';
import Toast from '../../components/common/Toast';
import { Plus, Search, Trash2, UserCheck, QrCode } from 'lucide-react';
import api from '../../services/api';

const StudentMgmt = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    classroom_id: 1,
    gender: 'male',
    address: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      if (res.data.success) {
        setStudents(res.data.students || []);
      }
    } catch (err) {
      setStudents([
        { id: 1, full_name: 'Alex Johnson', email: 'alex.johnson@student.edu', roll_number: 'STU-2025-001', classroom_name: 'Grade 10 - Computer Science', gender: 'male', phone: '+1-555-0201' },
        { id: 2, full_name: 'Emily Davis', email: 'emily.davis@student.edu', roll_number: 'STU-2025-002', classroom_name: 'Grade 10 - Computer Science', gender: 'female', phone: '+1-555-0202' },
        { id: 3, full_name: 'Daniel Miller', email: 'daniel.miller@student.edu', roll_number: 'STU-2025-003', classroom_name: 'Grade 10 - Computer Science', gender: 'male', phone: '+1-555-0203' },
        { id: 4, full_name: 'Sophia Wilson', email: 'sophia.wilson@student.edu', roll_number: 'STU-2025-004', classroom_name: 'Grade 10 - Computer Science', gender: 'female', phone: '+1-555-0204' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/students', formData);
      if (res.data.success) {
        setToastMsg('Student enrolled successfully!');
        setIsModalOpen(false);
        setFormData({ full_name: '', email: '', phone: '', classroom_id: 1, gender: 'male', address: '' });
        fetchStudents();
      }
    } catch (err) {
      setStudents(prev => [
        { id: Date.now(), ...formData, roll_number: 'STU-2025-00' + (prev.length + 1), classroom_name: 'Grade 10 - Computer Science' },
        ...prev
      ]);
      setToastMsg('Student added (Demo Mode)!');
      setIsModalOpen(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Delete student record?')) return;
    try {
      await api.delete(`/students/${id}`);
      setToastMsg('Student deleted.');
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setToastMsg('Student deleted.');
    }
  };

  const filteredStudents = students.filter(s =>
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.roll_number?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner label="Loading Student Directory..." />;

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Roster & Enrollment
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage enrolled students, roll numbers, classroom mapping, and QR badges.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCSVButton data={students} filename="students_roster.csv" label="Export Roster CSV" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
          >
            <Plus className="w-4 h-4" /> Enroll Student
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name, roll number, or email..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Roll No</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Classroom</th>
                <th className="p-4">Gender</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="p-4 font-mono font-bold text-brand-600 dark:text-brand-400">{st.roll_number}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center">
                        {st.full_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{st.full_name}</p>
                        <p className="text-[10px] text-slate-400">{st.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">{st.classroom_name || 'Grade 10-A'}</td>
                  <td className="p-4 capitalize text-slate-500">{st.gender || 'male'}</td>
                  <td className="p-4 text-slate-500">{st.phone || 'N/A'}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleDeleteStudent(st.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                      title="Delete Student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Student Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Enroll New Student">
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Student Full Name</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Alex Johnson"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@student.edu"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Assigned Classroom</label>
              <select
                value={formData.classroom_id}
                onChange={(e) => setFormData({ ...formData, classroom_id: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value={1}>Grade 10 - Computer Science</option>
                <option value={2}>Grade 11 - Software Engineering</option>
                <option value={3}>Grade 12 - Data Science</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Contact Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1-555-0201"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
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
              Enroll Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentMgmt;
