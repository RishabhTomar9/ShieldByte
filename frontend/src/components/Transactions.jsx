import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const transactionsData = [
  {
    id: 'TXN001',
    user: 'Alice Johnson',
    amount: 250.0,
    date: '2025-05-14',
    status: 'Success',
  },
  {
    id: 'TXN002',
    user: 'Bob Smith',
    amount: 125.5,
    date: '2025-05-13',
    status: 'Pending',
  },
  {
    id: 'TXN003',
    user: 'Charlie Brown',
    amount: 300.0,
    date: '2025-05-12',
    status: 'Failed',
  },
  // Add more transactions as needed
];

const Transactions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactionsData.filter((txn) =>
    txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f0ff] via-[#f7fbff] to-white py-10 px-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-10 flex items-center active:scale-95 font-semibold cursor-pointer bg-gradient-to-br from-[#153468] via-[#1e4d91] to-[#2e74b5] text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-[#d1e3f8]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#ffff"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Home
      </button>

      <div className="w-full mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl font-semibold text-[#153468] mb-6">Transactions</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by User or Transaction ID"
            className="w-full px-4 py-3 border border-[#cce0f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e74b5] text-[#153468]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#d1e3f8]">
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1e4d91]">Transaction ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1e4d91]">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1e4d91]">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1e4d91]">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1e4d91]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-[#f0faff] transition duration-300 ease-in-out cursor-default"
                >
                  <td className="px-6 py-4 text-sm text-[#153468]">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-[#153468]">{txn.user}</td>
                  <td className="px-6 py-4 text-sm text-[#153468]">${txn.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-[#153468]">{txn.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition duration-300 ease-in-out ${
                        txn.status === 'Success'
                          ? 'bg-green-100 text-green-800 animate-pulse'
                          : txn.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 animate-bounce'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-[#1e4d91] font-semibold">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
