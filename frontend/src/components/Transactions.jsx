import React, { useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactionsData.filter((txn) =>
    txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#153468] via-[#1e4d91] to-[#2e74b5] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Transactions</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by User or Transaction ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-blue-100 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-2 text-sm text-gray-800">{txn.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{txn.user}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">${txn.amount.toFixed(2)}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{txn.date}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold transition duration-300 ease-in-out ${
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
                  <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
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
