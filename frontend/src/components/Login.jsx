// src/components/Login.jsx
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiShieldCheck } from "react-icons/hi";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, phoneNumber, photoURL } = result.user;

      const userData = {
        name: displayName,
        email,
        phone: phoneNumber || "",
        picture: photoURL || "",
      };

      await axios.post("http://localhost:5000/api/auth/google-login", userData);

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      navigate("/");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white p-6">
      <div className="w-full max-w-md rounded-3xl p-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-center">
        <h1 className="flex items-center justify-center gap-2 text-4xl font-bold tracking-wide text-cyan-300 mb-3">
          <HiShieldCheck className="text-cyan-400 text-4xl" />
          TrustGuard
        </h1>

        <p className="text-sm text-slate-300 mb-8">
          Authenticate securely with Google
        </p>

        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 w-full"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>

        <div className="mt-10 text-xs text-slate-400">
          By continuing, you agree to TrustGuard’s <br />
          <span className="underline cursor-pointer hover:text-slate-200">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer hover:text-slate-200">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
};

export default Login;
