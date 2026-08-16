import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const defaultData = [
  { subject: 'Algorithms', avgScore: 88 },
  { subject: 'Web Eng', avgScore: 92 },
  { subject: 'DBMS', avgScore: 84 },
  { subject: 'Architecture', avgScore: 78 },
  { subject: 'ML Basics', avgScore: 90 },
];

const PerformanceChart = ({ data = defaultData }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
          <XAxis dataKey="subject" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
          />
          <Bar dataKey="avgScore" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Average Score (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
