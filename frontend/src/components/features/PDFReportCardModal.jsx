import React from 'react';
import Modal from '../common/Modal';
import { Printer, GraduationCap, Award, CheckCircle } from 'lucide-react';

const PDFReportCardModal = ({ isOpen, onClose, reportCard }) => {
  if (!reportCard) return null;

  const { student, marks = [], totalObtained = 181.5, totalMax = 200, percentage = '90.75', grade = 'A+', issued_date = new Date().toLocaleDateString() } = reportCard;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Digital Academic Report Card" maxWidth="max-w-2xl">
      <div className="space-y-6 p-2 printable-area">
        
        {/* Report Card Banner */}
        <div className="p-6 bg-gradient-to-r from-brand-900 to-slate-900 text-white rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-6 h-6 text-brand-400" />
              <h2 className="font-extrabold text-xl tracking-tight">Smart Classroom Academy</h2>
            </div>
            <p className="text-xs text-slate-300">Official Student Performance Evaluation Transcript</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-brand-500/30 border border-brand-400/40 rounded-full text-xs font-bold text-brand-300">
              Academic Year {student?.academic_year || '2025-2026'}
            </span>
          </div>
        </div>

        {/* Student Meta Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{student?.full_name || 'Alex Johnson'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Roll Number</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{student?.roll_number || 'STU-2025-001'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Class Section</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{student?.classroom_name || 'Grade 10 - CS'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Issue Date</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{issued_date}</span>
          </div>
        </div>

        {/* Exam Score Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Subject Code</th>
                <th className="p-3">Subject Title</th>
                <th className="p-3">Exam Name</th>
                <th className="p-3 text-right">Marks Obtained</th>
                <th className="p-3 text-right">Max Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {marks.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold text-brand-600 dark:text-brand-400">{m.subject_code || 'CS-101'}</td>
                  <td className="p-3 font-medium text-slate-900 dark:text-slate-100">{m.subject_name || 'Subject'}</td>
                  <td className="p-3 text-slate-500">{m.exam_name || 'Midterm'}</td>
                  <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">{m.marks_obtained}</td>
                  <td className="p-3 text-right text-slate-500">{m.max_marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Cumulative Totals */}
        <div className="p-4 bg-brand-50 dark:bg-slate-800 border border-brand-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-brand-600 dark:text-brand-400" />
            <div>
              <span className="text-xs text-slate-500 block font-semibold">Cumulative Final Score</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                {totalObtained} / {totalMax} Marks ({percentage}%)
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block font-semibold">Grade Standing</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{grade}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>

      </div>
    </Modal>
  );
};

export default PDFReportCardModal;
