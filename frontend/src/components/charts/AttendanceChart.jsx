import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const defaultData = [
  { day: 'Mon', present: 92, absent: 8 },
  { day: 'Tue', present: 95, absent: 5 },
  { day: 'Wed', present: 88, absent: 12 },
  { day: 'Thu', present: 94, absent: 6 },
  { day: 'Fri', present: 90, absent: 10 },
  { day: 'Sat', present: 85, absent: 15 },
];

const AttendanceChart = ({ data = defaultData }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0c8ce9" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#0c8ce9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="absentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
          />
          <Area type="monotone" dataKey="present" stroke="#0c8ce9" strokeWidth={2.5} fillOpacity={1} fill="url(#presentGrad)" name="Present %" />
          <Area type="monotone" dataKey="absent" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#absentGrad)" name="Absent %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
