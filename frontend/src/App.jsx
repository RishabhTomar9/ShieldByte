import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Transactions from "./components/Transactions";
import AnalyticsPage from "./components/AnalyticsPage";

import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/transactions" element={<Transactions />}></Route>
      <Route path="/analytics" element={<AnalyticsPage
      />}></Route>
   
      
    </Routes>
  );
}

export default App;
