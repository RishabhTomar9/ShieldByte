import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Jan', users: 400, transactions: 240 },
  { name: 'Feb', users: 300, transactions: 139 },
  { name: 'Mar', users: 500, transactions: 380 },
  { name: 'Apr', users: 278, transactions: 390 },
  { name: 'May', users: 189, transactions: 480 },
  { name: 'Jun', users: 239, transactions: 380 },
  { name: 'Jul', users: 349, transactions: 430 },
];

const AnalyticsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f0ff] via-[#f7fbff] to-white py-10 px-6">
      {/* Back to Home Button */}
      <div className="mb-10">
        <button
        onClick={() => navigate('/')}
        className="mb-10 flex items-center font-semibold cursor-pointer text-white  bg-gradient-to-br from-[#153468] via-[#1e4d91] to-[#2e74b5] active:scale-95 px-4 py-2 rounded-md shadow-md transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Home
      </button>
      </div>

      <h2 className="text-3xl font-semibold text-[#153468] mb-8">Analytics Dashboard</h2>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-semibold text-[#1e4d91] mb-4">User & Transaction Overview</h3>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1e3f8" />
              <XAxis dataKey="name" stroke="#153468" />
              <YAxis stroke="#153468" />
              <Tooltip contentStyle={{ backgroundColor: '#f0faff', borderColor: '#cce0f5' }} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="users" fill="#2e74b5" radius={[10, 10, 0, 0]} />
              <Bar dataKey="transactions" fill="#1e4d91" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
