// src/components/Login.jsx
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, phoneNumber, photoURL } = result.user;

      const userData = {
        name: displayName,
        email,
        phone: phoneNumber || "Not Provided", // Google might not provide phoneNumber
        picture: photoURL || "", // Add photo URL here
      };

      // Store in DB
      await axios.post("http://localhost:5000/api/auth/google-login", userData);

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 text-white p-6">
      <div className="bg-white text-gray-800 p-10 rounded-3xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to TrustGuard</h1>
        {/* <p className="mb-6 text-gray-600">Have an account? Log in with Google or Sign up</p> */}
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
