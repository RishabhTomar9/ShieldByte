import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    picture: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setProfile({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        role: userData.role || "",
        picture: userData.picture || "", // photo URL here
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-[#e3e8f0] to-[#f0f4f8] py-12 px-6 flex flex-col items-center relative font-sans text-gray-800">
      <Link
        to="/"
        className="fixed top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#3f72af] transition font-semibold text-sm md:text-base"
        aria-label="Back to Home"
      >
        <FaArrowLeft /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row gap-12"
      >
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#557a95] to-[#769fcd] flex items-center justify-center text-white text-7xl font-extrabold shadow-lg select-none overflow-hidden border-4 border-white">
            {profile.picture ? (
              <img
                src={profile.picture}
                alt={`${profile.name}'s profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none"; // Hide broken image
                }}
                loading="lazy"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-white p-4" />
            )}
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-[#334e68]">{profile.name}</h2>
          <p className="text-[#557a95] font-medium mt-2 tracking-wide">{profile.role}</p>

          <button
            onClick={handleLogout}
            className="mt-12 bg-red-600 hover:bg-red-700 transition cursor-pointer text-white px-6 py-2 rounded-full flex items-center gap-3 font-semibold shadow-md text-lg"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="md:w-2/3">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-4xl font-extrabold text-[#223343]">My Profile</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-3 text-[#557a95] font-semibold hover:text-[#334e68] transition text-lg cursor-pointer"
            >
              {isEditing ? <><FaSave /> Save</> : <><FaEdit /> Edit</>}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {["name", "email", "phone", "role"].map((field) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <label
                    htmlFor={field}
                    className="mb-3 font-semibold text-[#2f4667] capitalize tracking-wide"
                  >
                    {field}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      id={field}
                      value={profile[field]}
                      onChange={handleChange}
                      pattern={field === "phone" ? "[0-9]{10}" : undefined}
                      placeholder={`Enter your ${field}`}
                      className="border border-[#aac8f4] rounded-xl px-5 py-3 text-lg text-[#223343] focus:outline-none focus:ring-3 focus:ring-[#557a95] transition shadow-sm"
                      required
                    />
                  ) : (
                     <p className="text-lg bg-[#f5f9ff] rounded-xl px-5 py-3">
                      {profile[field] || (field === "phone" ? "Enter Your Phone number" : field === "role" ? "Role" : "")}
                    </p>
                  )}
                </motion.div>
              ))}
            {isEditing && (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#557a95] text-white px-8 py-4 rounded-xl hover:bg-[#466482] transition duration-300 font-semibold text-lg shadow-md cursor-pointer"
              >
                Save Changes
              </motion.button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
