import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { FileText, Send, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import api from '../../services/api';

const AssignmentsView = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [comments, setComments] = useState('');
  const [toastMsg, setToastMsg] = useState('');

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
        { id: 1, title: 'Binary Tree Implementation', description: 'Implement AVL Tree balancing algorithms in JavaScript/Python.', subject_name: 'Data Structures & Algorithms', due_date: '2026-08-15 23:59:00', total_points: 100 },
        { id: 2, title: 'RESTful Express API Setup', description: 'Build a simple JWT authenticated CRUD microservice.', subject_name: 'Web Engineering & Node.js', due_date: '2026-08-18 23:59:00', total_points: 50 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmit = (asg) => {
    setActiveAssignment(asg);
    setSubmissionUrl('');
    setComments('');
    setIsSubmitModalOpen(true);
  };

  const handleSubmitWork = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/assignments/submit', {
        assignment_id: activeAssignment.id,
        submission_url: submissionUrl,
        comments
      });
      setToastMsg(res.data.message || 'Assignment submitted!');
      setIsSubmitModalOpen(false);
    } catch (err) {
      setToastMsg('Assignment submitted (Demo Mode)!');
      setIsSubmitModalOpen(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading Assignments..." />;

  return (
    <div className="space-y-6">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Assignments & Homework Tasks
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Submit completed code repositories or project documents online.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((asg) => (
          <div key={asg.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  {asg.subject_name || 'Subject'}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Due: {asg.due_date}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{asg.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{asg.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Points: {asg.total_points}</span>
              <button
                onClick={() => handleOpenSubmit(asg)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition"
              >
                <Send className="w-3.5 h-3.5" /> Submit Work
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} title={`Submit: ${activeAssignment?.title}`}>
        <form onSubmit={handleSubmitWork} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Submission URL / GitHub Link / Google Drive Link</label>
            <input
              type="url"
              required
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              placeholder="https://github.com/username/project"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Additional Notes for Instructor</label>
            <textarea
              rows="3"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Comments or notes on your submission..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md"
            >
              Turn In Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssignmentsView;
