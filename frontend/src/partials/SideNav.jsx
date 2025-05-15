import React, { useState } from 'react';
import {
  FaHome,
  FaEnvelope,
  FaChartBar,
  FaCreditCard,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';

const menuItemsTop = [
  { label: 'Overview', icon: <FaHome /> },
  { label: 'Message', icon: <FaEnvelope /> },
  { label: 'Analytics', icon: <FaChartBar /> },
  { label: 'Transaction', icon: <FaCreditCard /> },
  { label: 'Profile', icon: <FaUser /> },
];

const menuItemsBottom = [
  { label: 'Settings', icon: <FaCog /> },
  { label: 'Log Out', icon: <FaSignOutAlt /> },
];

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen ${
        isOpen ? 'w-[260px]' : 'w-[80px]'
      } bg-gradient-to-br from-[#153468] via-[#1e4d91] to-[#2e74b5] p-4 flex flex-col justify-between shadow-2xl transition-all duration-300`}
    >
      {/* Toggle and Logo */}
      <div>
        <div className="flex items-center gap-2 mb-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white ml-3 cursor-pointer"
          >
            <FaBars size={20} />
          </button>
          {isOpen && (
            <h1 className="text-white text-2xl italic font-semibold tracking-wider">
              TrustGuard
            </h1>
          )}
        </div>

        {/* Top Menu */}
        <ul className="space-y-3">
          {menuItemsTop.map((item, index) => (
            <li
              key={index}
              className="group relative flex items-center text-white text-sm py-2 px-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-white/10"
            >
              {/* Left hover bar */}
              <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>

              <div className="flex items-center w-full space-x-4">
                <span className="text-lg">{item.icon}</span>
                <span
                  className={`text-base group-hover:font-semibold transition-opacity duration-200 ${
                    isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {!isOpen && (
                <span className="absolute left-16 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Menu */}
      <ul className="space-y-2">
        {menuItemsBottom.map((item, index) => (
          <li
            key={index}
            className="group relative flex items-center text-white text-sm py-2 px-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-white/10"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>

            <div className="flex items-center w-full space-x-4">
              <span className="text-lg">{item.icon}</span>
              <span
                className={`text-base group-hover:font-semibold transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                }`}
              >
                {item.label}
              </span>
            </div>

            {!isOpen && (
              <span className="absolute left-16 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
