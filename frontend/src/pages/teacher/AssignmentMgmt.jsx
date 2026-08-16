import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { Plus, FileText, CheckCircle, Clock, ExternalLink, Award } from 'lucide-react';
import api from '../../services/api';

const AssignmentMgmt = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [activeAssignmentTitle, setActiveAssignmentTitle] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject_id: 1,
    classroom_id: 1,
    due_date: '2026-08-20T23:59',
    total_points: 100
  });

  const [gradeData, setGradeData] = useState({
    submission_id: null,
    grade: 95,
    feedback: 'Excellent work!'
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await api.get('/assignments');
      if (res.data.success) {
        setAssignments(res.data.assignments || []);
      }
    } catch (err) {
      setAssignments([
        { id: 1, title: 'Binary Tree Implementation', description: 'Implement AVL Tree balancing algorithms in JavaScript/Python.', subject_name: 'Data Structures & Algorithms', classroom_name: 'Grade 10 - Computer Science', due_date: '2026-08-15 23:59:00', total_points: 100 },
        { id: 2, title: 'RESTful Express API Setup', description: 'Build a simple JWT authenticated CRUD microservice.', subject_name: 'Web Engineering & Node.js', classroom_name: 'Grade 10 - Computer Science', due_date: '2026-08-18 23:59:00', total_points: 50 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/assignments', formData);
      if (res.data.success) {
        setToastMsg('Assignment published!');
        setIsCreateModalOpen(false);
        fetchAssignments();
      }
    } catch (err) {
      setAssignments(prev => [
        { id: Date.now(), ...formData, subject_name: 'Data Structures', classroom_name: 'Grade 10 - CS' },
        ...prev
      ]);
      setToastMsg('Assignment published (Demo Mode)!');
      setIsCreateModalOpen(false);
    }
  };

  const handleOpenSubmissions = async (assignment) => {
    setActiveAssignmentTitle(assignment.title);
    try {
      const res = await api.get(`/assignments/${assignment.id}/submissions`);
      if (res.data.success) {
        setSelectedSubmissions(res.data.submissions || []);
      }
    } catch (err) {
      setSelectedSubmissions([
        { id: 1, student_name: 'Alex Johnson', roll_number: 'STU-2025-001', submission_url: 'https://github.com/alexjohnson/binary-tree-lab', status: 'graded', grade: 95.00, feedback: 'Great code!' },
        { id: 2, student_name: 'Emily Davis', roll_number: 'STU-2025-002', submission_url: 'https://github.com/emilydavis/avl-trees', status: 'submitted', grade: null, feedback: '' }
      ]);
    }
    setIsGradeModalOpen(true);
  };

  const handleGradeSubmit = async (submissionId) => {
    try {
      await api.put(`/assignments/grade/${submissionId}`, gradeData);
      setToastMsg('Grade updated successfully!');
      setSelectedSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'graded', grade: gradeData.grade, feedback: gradeData.feedback } : s));
    } catch (err) {
      setSelectedSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'graded', grade: gradeData.grade, feedback: gradeData.feedback } : s));
      setToastMsg('Grade updated (Demo Mode)!');
    }
  };

  if (loading) return <LoadingSpinner label="Loading Assignments..." />;

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Assignments & Homework Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Post new homework assignments, review student GitHub/Drive submissions, and grade work.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
        >
          <Plus className="w-4 h-4" /> Post New Assignment
        </button>
      </div>

      {/* Assignments List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((asg) => (
          <div key={asg.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  {asg.subject_name || 'Computer Science'}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Due: {asg.due_date}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{asg.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{asg.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Total Points: {asg.total_points}
              </span>
              <button
                onClick={() => handleOpenSubmissions(asg)}
                className="px-3.5 py-1.5 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 rounded-xl transition flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> View Submissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Assignment">
        <form onSubmit={handleCreateAssignment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Assignment Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Binary Search Tree Implementation"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Description & Instructions</label>
            <textarea
              rows="3"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed instructions for students..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Due Date & Time</label>
              <input
                type="datetime-local"
                required
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Total Points</label>
              <input
                type="number"
                value={formData.total_points}
                onChange={(e) => setFormData({ ...formData, total_points: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md"
            >
              Publish Assignment
            </button>
          </div>
        </form>
      </Modal>

      {/* Submissions & Grading Modal */}
      <Modal isOpen={isGradeModalOpen} onClose={() => setIsGradeModalOpen(false)} title={`Submissions: ${activeAssignmentTitle}`} maxWidth="max-w-2xl">
        <div className="space-y-4">
          {selectedSubmissions.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">No student submissions submitted yet.</p>
          ) : (
            selectedSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{sub.student_name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{sub.roll_number}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    sub.status === 'graded' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {sub.status} {sub.grade ? `(${sub.grade}/100)` : ''}
                  </span>
                </div>

                <a
                  href={sub.submission_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Submitted Code / Document
                </a>

                {/* Grade Input Form */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                  <input
                    type="number"
                    placeholder="Score (0-100)"
                    onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
                    className="w-28 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Feedback comments..."
                    onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                    className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg"
                  />
                  <button
                    onClick={() => handleGradeSubmit(sub.id)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                  >
                    Grade
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>

    </div>
  );
};

export default AssignmentMgmt;
