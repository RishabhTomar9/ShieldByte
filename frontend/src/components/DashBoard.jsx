import { useState, useEffect,  } from 'react';
import { FaSearch, FaBell, FaArrowUp, FaArrowDown, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import SideNav from '../partials/sideNav';
import { useNavigate } from 'react-router-dom';
// import { saveTestResult, fetchTestHistory } from '../utils/api';

const transactions = [
  { id: 1, name: 'Ronald Richards', date: '21 Jan, 2023', status: 'Pending', amount: -3000 },
  { id: 2, name: 'Floyd Miles', date: '21 Jan, 2023', status: 'Completed', amount: 6700 },
  { id: 3, name: 'Cody Fisher', date: '21 Jan, 2023', status: 'Completed', amount: 4000 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
    // Network Speed Test State
    const [downloadSpeed, setDownloadSpeed] = useState(null);
    const [uploadSpeed, setUploadSpeed] = useState(null);
    const [speedTestRunning, setSpeedTestRunning] = useState(false);
  
    // Typing Speed Test State
    const [typingText] = useState("The quick brown fox jumps over the lazy dog.");
    const [typedText, setTypedText] = useState("");
    const [typingStartTime, setTypingStartTime] = useState(null);
    const [typingSpeedWPM, setTypingSpeedWPM] = useState(null);
    const [typingTestCompleted, setTypingTestCompleted] = useState(false);
  
    // History
    const [history, setHistory] = useState([]);
  
    const user = JSON.parse(localStorage.getItem("user"));
  
    // Function to simulate a simple network speed test (download/upload)
    // This is a mock: in real app use libraries like speedtest-net or dedicated APIs
    const runSpeedTest = async () => {
      setSpeedTestRunning(true);
      // Simulate download speed (Mbps)
      const simulatedDownload = (Math.random() * 100 + 20).toFixed(2);
      // Simulate upload speed (Mbps)
      const simulatedUpload = (Math.random() * 50 + 10).toFixed(2);
  
      // Wait 2 seconds to simulate test
      await new Promise((r) => setTimeout(r, 2000));
  
      setDownloadSpeed(simulatedDownload);
      setUploadSpeed(simulatedUpload);
      setSpeedTestRunning(false);
  
      // Save to backend
      saveTestResult({
        type: "speed",
        download: simulatedDownload,
        upload: simulatedUpload,
      });
    };
  
    // Typing Test Handlers
    const handleTypingChange = (e) => {
      const value = e.target.value;
      if (!typingStartTime && value.length === 1) {
        setTypingStartTime(Date.now());
      }
      setTypedText(value);
  
      if (value === typingText) {
        const timeTakenMinutes = (Date.now() - typingStartTime) / 60000;
        const wordsCount = typingText.split(" ").length;
        const wpm = Math.round(wordsCount / timeTakenMinutes);
        setTypingSpeedWPM(wpm);
        setTypingTestCompleted(true);
  
        // Save to backend
        saveTestResult({
          type: "typing",
          wpm,
        });
      }
    };
  
    // Save test results to backend (replace URL with your API)
      const saveTestResult = async (result) => {
      if (!user) return;
        try {
          const response = await fetch("http://localhost:5000/api/tests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user._id,
              ...result,
              date: new Date().toISOString(),
            }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            console.error("Failed to save test result:", data.message || data.error || data);
            return;
          }
      
          console.log("Test result saved successfully:", data);
      
          // Refresh history after saving
          fetchHistory();
        } catch (error) {
          console.error("Network error while saving test result:", error);
        }
      };

    // Fetch test history for logged-in user
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const res = await fetch(`http://localhost:5000/api/tests/${user._id}`);
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
  
    useEffect(() => {
      if (user) fetchHistory();
    }, []);

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
              className="relative group cursor-pointer hidden md:block"
              onClick={() => navigate('/profile')}
            >
              {JSON.parse(localStorage.getItem("user"))?.picture ? (
                <img
                  src={JSON.parse(localStorage.getItem("user")).picture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <FaUserCircle size={30} className="text-gray-700" />
              )}
            
              {/* Hover Text */}
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-10">
                Profile
              </div>
            </div>
          </div>
        </div>

        {/* Replacing Top Cards with Speed & Typing tests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Network Speed Test */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">Network Speed Test</h2>
            <button
              onClick={runSpeedTest}
              disabled={speedTestRunning}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {speedTestRunning ? "Testing..." : "Start Test"}
            </button>
            {downloadSpeed && uploadSpeed && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-semibold">
                  Download Speed: {downloadSpeed} Mbps
                </p>
                <p className="text-green-600 font-semibold">
                  Upload Speed: {uploadSpeed} Mbps
                </p>
              </div>
            )}
          </div>

          {/* Typing Speed Test */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Typing Speed Test</h2>
            <p className="mb-2 text-gray-700">{typingText}</p>
            <textarea
              rows="3"
              value={typedText}
              onChange={handleTypingChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Start typing here..."
              disabled={typingTestCompleted}
            />
            {typingTestCompleted && (
              <p className="mt-3 text-green-600 font-semibold">
                Your typing speed is {typingSpeedWPM} WPM
              </p>
            )}
            {typingTestCompleted && (
              <button
                onClick={() => {
                  setTypedText("");
                  setTypingStartTime(null);
                  setTypingSpeedWPM(null);
                  setTypingTestCompleted(false);
                }}
                className="mt-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Retry
              </button>
            )}
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-xl shadow p-6 mt-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Test History</h2>
          {!history.length && (
            <p className="text-gray-500">No test history available.</p>
          )}
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {history.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded p-3 flex justify-between items-center"
              >
                <span>
                  {new Date(item.date).toLocaleString()} -{" "}
                  {item.type === "speed"
                    ? `Network Speed: ↓${item.download} Mbps / ↑${item.upload} Mbps`
                    : `Typing Speed: ${item.wpm} WPM`}
                </span>
              </li>
            ))}
          </ul>
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
