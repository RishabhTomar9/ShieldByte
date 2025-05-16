// import React, { useState, useEffect, useRef } from 'react';
// import { FaSearch, FaBell, FaArrowUp, FaArrowDown, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
// import SideNav from '../partials/sideNav';
// import { useNavigate } from 'react-router-dom';
// // ... keep all your imports from before

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Network Speed Test State
//   const [downloadSpeed, setDownloadSpeed] = useState(null);
//   const [uploadSpeed, setUploadSpeed] = useState(null);
//   const [speedTestRunning, setSpeedTestRunning] = useState(false);

//   // Typing Speed Test State
//   const [typingText] = useState("The quick brown fox jumps over the lazy dog.");
//   const [typedText, setTypedText] = useState("");
//   const [typingStartTime, setTypingStartTime] = useState(null);
//   const [typingSpeedWPM, setTypingSpeedWPM] = useState(null);
//   const [typingTestCompleted, setTypingTestCompleted] = useState(false);

//   // History
//   const [history, setHistory] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   // Function to simulate a simple network speed test (download/upload)
//   // This is a mock: in real app use libraries like speedtest-net or dedicated APIs
//   const runSpeedTest = async () => {
//     setSpeedTestRunning(true);
//     // Simulate download speed (Mbps)
//     const simulatedDownload = (Math.random() * 100 + 20).toFixed(2);
//     // Simulate upload speed (Mbps)
//     const simulatedUpload = (Math.random() * 50 + 10).toFixed(2);

//     // Wait 2 seconds to simulate test
//     await new Promise((r) => setTimeout(r, 2000));

//     setDownloadSpeed(simulatedDownload);
//     setUploadSpeed(simulatedUpload);
//     setSpeedTestRunning(false);

//     // Save to backend
//     saveTestResult({
//       type: "speed",
//       download: simulatedDownload,
//       upload: simulatedUpload,
//     });
//   };

//   // Typing Test Handlers
//   const handleTypingChange = (e) => {
//     const value = e.target.value;
//     if (!typingStartTime && value.length === 1) {
//       setTypingStartTime(Date.now());
//     }
//     setTypedText(value);

//     if (value === typingText) {
//       const timeTakenMinutes = (Date.now() - typingStartTime) / 60000;
//       const wordsCount = typingText.split(" ").length;
//       const wpm = Math.round(wordsCount / timeTakenMinutes);
//       setTypingSpeedWPM(wpm);
//       setTypingTestCompleted(true);

//       // Save to backend
//       saveTestResult({
//         type: "typing",
//         wpm,
//       });
//     }
//   };

//   // Save test results to backend (replace URL with your API)
//   const saveTestResult = async (result) => {
//     if (!user) return;
//     try {
//       await fetch("http://localhost:5000/api/tests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user._id,
//           ...result,
//           date: new Date().toISOString(),
//         }),
//       });
//       // Refresh history after saving
//       fetchHistory();
//     } catch (error) {
//       console.error("Error saving test result:", error);
//     }
//   };

//   // Fetch test history for logged-in user
//   const fetchHistory = async () => {
//     if (!user) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/tests/${user._id}`);
//       const data = await res.json();
//       setHistory(data);
//     } catch (error) {
//       console.error("Error fetching history:", error);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchHistory();
//   }, []);

//   return (
//     <div className="flex h-screen bg-[#f5f7fa] font-sans overflow-hidden">
//       {/* Your sidebar and header code stays unchanged */}

//       {/* Sidebar and overlay here... */}

//       <main className="flex-1 ml-0 w-full p-4 md:p-8 overflow-y-auto">
//         {/* Header stays same */}

//         {/* Replacing Top Cards with Speed & Typing tests */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//           {/* Network Speed Test */}
//           <div className="bg-white rounded-xl p-6 shadow flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-4">Network Speed Test</h2>
//             <button
//               onClick={runSpeedTest}
//               disabled={speedTestRunning}
//               className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
//             >
//               {speedTestRunning ? "Testing..." : "Start Test"}
//             </button>
//             {downloadSpeed && uploadSpeed && (
//               <div className="mt-4 text-center">
//                 <p className="text-green-600 font-semibold">
//                   Download Speed: {downloadSpeed} Mbps
//                 </p>
//                 <p className="text-green-600 font-semibold">
//                   Upload Speed: {uploadSpeed} Mbps
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Typing Speed Test */}
//           <div className="bg-white rounded-xl p-6 shadow flex flex-col">
//             <h2 className="text-lg font-semibold mb-4">Typing Speed Test</h2>
//             <p className="mb-2 text-gray-700">{typingText}</p>
//             <textarea
//               rows="3"
//               value={typedText}
//               onChange={handleTypingChange}
//               className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Start typing here..."
//               disabled={typingTestCompleted}
//             />
//             {typingTestCompleted && (
//               <p className="mt-3 text-green-600 font-semibold">
//                 Your typing speed is {typingSpeedWPM} WPM
//               </p>
//             )}
//             {typingTestCompleted && (
//               <button
//                 onClick={() => {
//                   setTypedText("");
//                   setTypingStartTime(null);
//                   setTypingSpeedWPM(null);
//                   setTypingTestCompleted(false);
//                 }}
//                 className="mt-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Retry
//               </button>
//             )}
//           </div>
//         </div>

//         {/* History Section */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Test History</h2>
//           {!history.length && (
//             <p className="text-gray-500">No test history available.</p>
//           )}
//           <ul className="space-y-4 max-h-96 overflow-y-auto">
//             {history.map((item, index) => (
//               <li
//                 key={index}
//                 className="border border-gray-200 rounded p-3 flex justify-between items-center"
//               >
//                 <span>
//                   {new Date(item.date).toLocaleString()} -{" "}
//                   {item.type === "speed"
//                     ? `Network Speed: ↓${item.download} Mbps / ↑${item.upload} Mbps`
//                     : `Typing Speed: ${item.wpm} WPM`}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Bottom Section stays unchanged */}

//       </main>
//     </div>
//   );
// };

// export default Dashboard;
