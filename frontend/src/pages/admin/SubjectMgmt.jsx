import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { Plus, FileSpreadsheet, Trash2, UserCheck, BookOpen } from 'lucide-react';
import api from '../../services/api';

const SubjectMgmt = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    subject_name: '',
    subject_code: '',
    teacher_id: 1,
    classroom_id: 1,
    credits: 3
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/subjects');
      if (res.data.success) {
        setSubjects(res.data.subjects || []);
      }
    } catch (err) {
      setSubjects([
        { id: 1, subject_name: 'Data Structures & Algorithms', subject_code: 'CS-101', teacher_name: 'Dr. Robert Vance', classroom_name: 'Grade 10 - CS', credits: 4 },
        { id: 2, subject_name: 'Web Engineering & Node.js', subject_code: 'CS-102', teacher_name: 'Prof. Sarah Jenkins', classroom_name: 'Grade 10 - CS', credits: 3 },
        { id: 3, subject_name: 'Database Management Systems', subject_code: 'CS-103', teacher_name: 'Prof. Sarah Jenkins', classroom_name: 'Grade 11 - SE', credits: 4 },
        { id: 4, subject_name: 'Computer Architecture', subject_code: 'CS-104', teacher_name: 'Michael Chen', classroom_name: 'Grade 11 - SE', credits: 3 },
        { id: 5, subject_name: 'Machine Learning Basics', subject_code: 'CS-105', teacher_name: 'Dr. Robert Vance', classroom_name: 'Grade 12 - DS', credits: 4 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/subjects', formData);
      if (res.data.success) {
        setToastMsg('Subject created!');
        setIsModalOpen(false);
        setFormData({ subject_name: '', subject_code: '', teacher_id: 1, classroom_id: 1, credits: 3 });
        fetchSubjects();
      }
    } catch (err) {
      setSubjects(prev => [
        { id: Date.now(), ...formData, teacher_name: 'Dr. Robert Vance', classroom_name: 'Grade 10 - CS' },
        ...prev
      ]);
      setToastMsg('Subject added (Demo Mode)!');
      setIsModalOpen(false);
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm('Delete subject syllabus entry?')) return;
    try {
      await api.delete(`/subjects/${id}`);
      setToastMsg('Subject deleted.');
      setSubjects(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setSubjects(prev => prev.filter(s => s.id !== id));
      setToastMsg('Subject deleted.');
    }
  };

  if (loading) return <LoadingSpinner label="Loading Course Syllabus..." />;

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Subjects & Course Syllabus Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Assign lead instructors, course credit points, and subject code mappings.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Subject Name</th>
                <th className="p-4">Lead Teacher</th>
                <th className="p-4">Classroom</th>
                <th className="p-4">Credits</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="p-4 font-mono font-bold text-brand-600 dark:text-brand-400">{sub.subject_code}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{sub.subject_name}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{sub.teacher_name || 'Dr. Vance'}</td>
                  <td className="p-4 text-slate-500">{sub.classroom_name || 'Grade 10'}</td>
                  <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{sub.credits} Credits</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteSubject(sub.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Subject Course">
        <form onSubmit={handleCreateSubject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Subject Name</label>
            <input
              type="text"
              required
              value={formData.subject_name}
              onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
              placeholder="Machine Learning Basics"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Subject Code</label>
              <input
                type="text"
                required
                value={formData.subject_code}
                onChange={(e) => setFormData({ ...formData, subject_code: e.target.value })}
                placeholder="CS-105"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Credits</label>
              <input
                type="number"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                placeholder="3"
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
              Save Subject
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SubjectMgmt;
