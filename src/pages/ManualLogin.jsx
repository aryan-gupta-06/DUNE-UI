import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ManualLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return alert("Enter email");

    setUser({ email, displayName: "Manual User", provider: "manual" });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-black/70 p-10 text-yellow-300">
        <h1 className="text-2xl mb-4">Manual Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-2 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-yellow-300 text-black px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
}
