import React from 'react';
import { FolderOpen } from 'lucide-react';

const EmptyState = ({ title = 'No records found', description = 'There is no data to display right now.', icon: Icon = FolderOpen, actionButton }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl my-4">
      <div className="p-3.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-2xl mb-3">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">{description}</p>
      {actionButton}
    </div>
  );
};

export default EmptyState;
