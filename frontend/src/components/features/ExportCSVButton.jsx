import React from 'react';
import { Download } from 'lucide-react';

const ExportCSVButton = ({ data = [], filename = 'smart_classroom_export.csv', label = 'Export CSV' }) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={!data || data.length === 0}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 rounded-xl transition shadow-xs disabled:opacity-40"
    >
      <Download className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
      <span>{label}</span>
    </button>
  );
};

export default ExportCSVButton;
