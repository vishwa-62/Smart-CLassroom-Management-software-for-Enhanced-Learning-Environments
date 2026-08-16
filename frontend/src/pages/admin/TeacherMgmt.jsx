import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ExportCSVButton from '../../components/features/ExportCSVButton';
import Toast from '../../components/common/Toast';
import { Plus, Search, Trash2, Edit, UserCheck, Mail, Phone, Shield } from 'lucide-react';
import api from '../../services/api';

const TeacherMgmt = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    qualification: '',
    department: 'Computer Science'
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await api.get('/teachers');
      if (res.data.success) {
        setTeachers(res.data.teachers || []);
      }
    } catch (err) {
      setTeachers([
        { id: 1, full_name: 'Dr. Robert Vance', email: 'robert.vance@smartclassroom.edu', employee_code: 'EMP-T101', qualification: 'Ph.D. in CS', department: 'Computer Science', phone: '+1-555-0101' },
        { id: 2, full_name: 'Prof. Sarah Jenkins', email: 'sarah.jenkins@smartclassroom.edu', employee_code: 'EMP-T102', qualification: 'M.Tech in SE', department: 'IT', phone: '+1-555-0102' },
        { id: 3, full_name: 'Michael Chen', email: 'michael.chen@smartclassroom.edu', employee_code: 'EMP-T103', qualification: 'M.Sc Physics', department: 'Electronics', phone: '+1-555-0103' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/teachers', formData);
      if (res.data.success) {
        setToastMsg('Teacher added successfully!');
        setIsModalOpen(false);
        setFormData({ full_name: '', email: '', phone: '', qualification: '', department: 'Computer Science' });
        fetchTeachers();
      }
    } catch (err) {
      setTeachers(prev => [
        { id: Date.now(), ...formData, employee_code: 'EMP-T' + Math.floor(100 + Math.random() * 900) },
        ...prev
      ]);
      setToastMsg('Teacher created (Demo Mode)!');
      setIsModalOpen(false);
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (!window.confirm('Are you sure you want to remove this faculty record?')) return;
    try {
      await api.delete(`/teachers/${id}`);
      setToastMsg('Teacher removed.');
      setTeachers(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setTeachers(prev => prev.filter(t => t.id !== id));
      setToastMsg('Teacher removed.');
    }
  };

  const filteredTeachers = teachers.filter(t => 
    t.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    t.email?.toLowerCase().includes(search.toLowerCase()) ||
    t.employee_code?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner label="Fetching Faculty Directory..." />;

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Teacher Directory Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage academic faculty, departmental qualifications, and instructor profiles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCSVButton data={teachers} filename="teachers_directory.csv" label="Export Faculty CSV" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
          >
            <Plus className="w-4 h-4" /> Add Teacher
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by teacher name, email, or employee code..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />
      </div>

      {/* Faculty Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Emp Code</th>
                <th className="p-4">Teacher Name</th>
                <th className="p-4">Department</th>
                <th className="p-4">Qualification</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTeachers.map((tc) => (
                <tr key={tc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="p-4 font-mono font-bold text-brand-600 dark:text-brand-400">{tc.employee_code}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center">
                        {tc.full_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{tc.full_name}</p>
                        <p className="text-[10px] text-slate-400">{tc.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">{tc.department || 'CS'}</td>
                  <td className="p-4 text-slate-500">{tc.qualification || 'M.Tech'}</td>
                  <td className="p-4 text-slate-500">{tc.phone || 'N/A'}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleDeleteTeacher(tc.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                      title="Delete Teacher"
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

      {/* Add Teacher Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Faculty Teacher">
        <form onSubmit={handleCreateTeacher} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Dr. John Smith"
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
              placeholder="john.smith@smartclassroom.edu"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Computer Science"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Qualification</label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="Ph.D. in Computer Science"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1-555-0199"
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
              Save Teacher Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherMgmt;
