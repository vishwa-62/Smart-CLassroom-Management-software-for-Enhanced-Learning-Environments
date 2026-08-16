import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FolderDown, Download, FileText } from 'lucide-react';
import api from '../../services/api';

const MaterialDownload = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

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
        { id: 1, title: 'Data Structures Lecture 01 - Recursion & Trees', description: 'Comprehensive slides on recursion and binary tree traversals.', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_type: 'PDF', subject_name: 'Data Structures & Algorithms', uploader_name: 'Dr. Robert Vance' },
        { id: 2, title: 'Express.js & Middleware Cheatsheet', description: 'Handy reference guide for routing, JWT, and custom error handling.', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', file_type: 'PDF', subject_name: 'Web Engineering & Node.js', uploader_name: 'Prof. Sarah Jenkins' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading Materials..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Download Study Materials & Notes
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Access lecture presentation slides and reference documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((mat) => (
          <div key={mat.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {mat.subject_name || 'Computer Science'}
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{mat.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{mat.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">By {mat.uploader_name || 'Faculty'}</span>
              <a
                href={mat.file_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialDownload;
