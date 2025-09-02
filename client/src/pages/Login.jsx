import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg w-80 space-y-6">
        <h2 className="text-2xl font-bold text-center text-pink-600">Welcome Back!</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />
        <button className="w-full bg-pink-500 text-white p-3 rounded-xl font-semibold hover:bg-purple-600 transition">
          Login
        </button>
        <p className="text-center text-sm text-gray-500">
          Don’t have an account? <Link to="/register" className="text-purple-500 font-medium">Register</Link>
        </p>
      </form>
    </div>
  );
}
