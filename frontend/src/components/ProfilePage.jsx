import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Samiksha Verma',
    email: 'samiksha@example.com',
    phone: '+91 9876543210',
    role: 'Developer',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    // You can replace with actual API call
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f0ff] via-[#f7fbff] to-white py-10 px-6">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold text-[#153468] mb-6 text-center"
      >
        My Profile
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl"
      >
        <h3 className="text-xl font-semibold text-[#1e4d91] mb-6">User Information</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {['name', 'email', 'phone', 'role'].map((field, idx) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
            >
              <label className="block text-[#153468] font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={profile[field]}
                onChange={handleChange}
                className="w-full border border-[#cce0f5] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e74b5] transition"
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#1e4d91] text-white px-6 py-3 rounded-lg hover:bg-[#153468] transition duration-300"
          >
            Update Profile
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <Link
          to="/"
          className="inline-block text-[#1e4d91] border border-[#1e4d91] px-5 py-2 rounded-lg hover:bg-[#1e4d91] hover:text-white transition duration-300"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
