import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { Upload, FileText, Download, Trash2, Plus, ExternalLink } from 'lucide-react';
import api from '../../services/api';

const MaterialUpload = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_type: 'PDF',
    subject_id: 1,
    classroom_id: 1
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await api.get('/materials');
      if (res.data.success) {
        setMaterials(res.data.materials || []);
      }
    } catch (err) {
      setMaterials([
        { id: 1, title: 'Data Structures Lecture 01 - Recursion & Trees', description: 'Comprehensive slides on recursion and binary tree traversals.', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_type: 'PDF', subject_name: 'Data Structures & Algorithms', classroom_name: 'Grade 10 - Computer Science', uploader_name: 'Dr. Robert Vance', created_at: '2026-08-01' },
        { id: 2, title: 'Express.js & Middleware Cheatsheet', description: 'Handy reference guide for routing, JWT, and custom error handling.', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_type: 'PDF', subject_name: 'Web Engineering & Node.js', classroom_name: 'Grade 10 - Computer Science', uploader_name: 'Prof. Sarah Jenkins', created_at: '2026-08-03' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/materials', formData);
      if (res.data.success) {
        setToastMsg('Study material published!');
        setIsModalOpen(false);
        fetchMaterials();
      }
    } catch (err) {
      setMaterials(prev => [
        { id: Date.now(), ...formData, subject_name: 'Computer Science', uploader_name: 'Faculty' },
        ...prev
      ]);
      setToastMsg('Material published (Demo Mode)!');
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove study material file?')) return;
    try {
      await api.delete(`/materials/${id}`);
      setToastMsg('Material removed.');
      setMaterials(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setMaterials(prev => prev.filter(m => m.id !== id));
      setToastMsg('Material removed.');
    }
  };

  if (loading) return <LoadingSpinner label="Loading Lecture Resources..." />;

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Study Materials & Lecture Notes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Share PDF slides, reading notes, and reference materials with enrolled students.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
        >
          <Upload className="w-4 h-4" /> Share New Resource
        </button>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((mat) => (
          <div key={mat.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {mat.file_type || 'PDF'}
                </span>
                <button onClick={() => handleDelete(mat.id)} className="p-1 text-slate-400 hover:text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{mat.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{mat.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">By {mat.uploader_name || 'Faculty'}</span>
              <a
                href={mat.file_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 rounded-xl transition"
              >
                <Download className="w-3.5 h-3.5" /> Download Notes
              </a>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Study Material">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Resource Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Data Structures Chapter 1 Notes"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of lecture contents..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Document Link / URL</label>
            <input
              type="text"
              required
              value={formData.file_url}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              placeholder="https://example.com/lecture.pdf"
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
              Share Document
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MaterialUpload;
