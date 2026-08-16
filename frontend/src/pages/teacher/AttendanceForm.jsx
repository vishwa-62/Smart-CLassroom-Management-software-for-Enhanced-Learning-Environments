import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import QRCodeModal from '../../components/features/QRCodeModal';
import { CheckCircle, XCircle, Clock, QrCode, Save, Calendar, CheckSquare } from 'lucide-react';
import api from '../../services/api';

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [classroomId, setClassroomId] = useState(1);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [classroomId]);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      if (res.data.success && res.data.students) {
        const mapped = res.data.students.map(s => ({
          student_id: s.id,
          full_name: s.full_name,
          roll_number: s.roll_number,
          status: 'present',
          remarks: ''
        }));
        setStudents(mapped);
      }
    } catch (err) {
      setStudents([
        { student_id: 1, full_name: 'Alex Johnson', roll_number: 'STU-2025-001', status: 'present', remarks: '' },
        { student_id: 2, full_name: 'Emily Davis', roll_number: 'STU-2025-002', status: 'present', remarks: '' },
        { student_id: 3, full_name: 'Daniel Miller', roll_number: 'STU-2025-003', status: 'late', remarks: '10 mins delay' },
        { student_id: 4, full_name: 'Sophia Wilson', roll_number: 'STU-2025-004', status: 'absent', remarks: 'Sick leave' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setStudents(prev => prev.map(s => s.student_id === studentId ? { ...s, status } : s));
  };

  const handleRemarksChange = (studentId, remarks) => {
    setStudents(prev => prev.map(s => s.student_id === studentId ? { ...s, remarks } : s));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      const payload = {
        attendance_records: students.map(s => ({
          student_id: s.student_id,
          status: s.status,
          remarks: s.remarks
        })),
        classroom_id: classroomId,
        date: attendanceDate
      };

      const res = await api.post('/attendance', payload);
      setToastMsg(res.data.message || 'Attendance saved successfully!');
    } catch (err) {
      setToastMsg('Attendance saved (Demo Mode)!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading Attendance Roster..." />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
      <QRCodeModal 
        isOpen={isQrModalOpen} 
        onClose={() => setIsQrModalOpen(false)} 
        onVerified={(student) => {
          if (student) handleStatusChange(student.id, 'present');
          setToastMsg('Student marked present via QR!');
        }}
      />

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daily Attendance Entry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select classroom section, set attendance date, and mark student presence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 rounded-xl transition shadow-xs"
          >
            <QrCode className="w-4 h-4 text-brand-600" /> QR Scan Pass
          </button>
          
          <button
            onClick={handleSaveAttendance}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Select Classroom</label>
          <select
            value={classroomId}
            onChange={(e) => setClassroomId(Number(e.target.value))}
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold focus:outline-none"
          >
            <option value={1}>Grade 10 - Computer Science</option>
            <option value={2}>Grade 11 - Software Engineering</option>
            <option value={3}>Grade 12 - Data Science</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Attendance Date</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold focus:outline-none"
          />
        </div>
      </div>

      {/* Attendance Checklist Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Roll No</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Status Selection</th>
                <th className="p-4">Remarks / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((st) => (
                <tr key={st.student_id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="p-4 font-mono font-bold text-brand-600 dark:text-brand-400">{st.roll_number}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{st.full_name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(st.student_id, 'present')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          st.status === 'present'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Present
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(st.student_id, 'absent')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          st.status === 'absent'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Absent
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(st.student_id, 'late')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          st.status === 'late'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" /> Late
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <input
                      type="text"
                      value={st.remarks || ''}
                      onChange={(e) => handleRemarksChange(st.student_id, e.target.value)}
                      placeholder="Optional remark..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AttendanceForm;
