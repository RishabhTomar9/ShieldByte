import React, { useState } from 'react';
import { FaSearch, FaBell, FaArrowUp, FaArrowDown, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import SideNav from '../partials/sideNav';
import { useNavigate } from 'react-router-dom';

const transactions = [
  { id: 1, name: 'Ronald Richards', date: '21 Jan, 2023', status: 'Pending', amount: -3000 },
  { id: 2, name: 'Floyd Miles', date: '21 Jan, 2023', status: 'Completed', amount: 6700 },
  { id: 3, name: 'Cody Fisher', date: '21 Jan, 2023', status: 'Completed', amount: 4000 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f7fa] font-sans overflow-hidden">
      {/* Mobile sidebar toggle button */}
      <div className="md:hidden fixed top-2 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md z-40
          w-64
          transform
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <SideNav />
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 ml-0 w-full p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search here"
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-200 transition hidden md:block">
              <FaBell size={20} />
            </button>
            <div
              className=" items-center space-x-3 cursor-pointer hidden md:block"
              onClick={() => navigate('/profile')}
            >
              <FaUserCircle size={30} className="text-gray-700" />
            </div>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold text-gray-600">Balance</p>
              <FaArrowUp className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600">$43,244</p>
            <p className="text-xs text-gray-400 mt-1">7.1% than last month</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold text-gray-600">Spending</p>
              <FaArrowDown className="text-red-500" />
            </div>
            <p className="text-3xl font-bold text-red-600">$23,742</p>
            <p className="text-xs text-gray-400 mt-1">5.4% than last month</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow p-6 overflow-y-auto max-h-[440px]">
            <h2 className="text-lg font-semibold mb-6">Transactions</h2>
            <ul>
              {transactions.map(({ id, name, date, status, amount }) => (
                <li
                  key={id}
                  className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {status}
                    </span>
                    <p
                      className={`font-semibold ${
                        amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {amount < 0 ? '-' : '+'}${Math.abs(amount).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col space-y-8 max-h-[440px] overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Alerts</h3>
              <ul className="space-y-4">
                <li className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded shadow-sm">
                  <p className="text-sm font-medium text-yellow-800">
                    Warning: Password will expire in 3 days.
                  </p>
                  <p className="text-xs text-yellow-600">Security Alert</p>
                </li>
                <li className="bg-red-50 border-l-4 border-red-400 p-3 rounded shadow-sm">
                  <p className="text-sm font-medium text-red-800">
                    Failed login attempt detected.
                  </p>
                  <p className="text-xs text-red-600">Security Alert</p>
                </li>
                <li className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded shadow-sm">
                  <p className="text-sm font-medium text-blue-800">
                    New update available. Please refresh.
                  </p>
                  <p className="text-xs text-blue-600">System Update</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Notifications</h3>
              <ul className="space-y-4">
                <li className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="text-sm font-medium text-blue-700">
                    Your account was accessed from a new device.
                  </p>
                  <p className="text-xs text-blue-500 mt-1">Today at 10:45 AM</p>
                </li>
                <li className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  <p className="text-sm font-medium text-green-700">
                    Payment of $3,200 was successful.
                  </p>
                  <p className="text-xs text-green-500 mt-1">Yesterday at 4:30 PM</p>
                </li>
                <li className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
                  <p className="text-sm font-medium text-yellow-700">
                    Password changed successfully.
                  </p>
                  <p className="text-xs text-yellow-500 mt-1">2 days ago</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
