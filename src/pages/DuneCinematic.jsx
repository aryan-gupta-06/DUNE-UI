import { useState } from "react";
import { useNavigate } from "react-router-dom";
import duneBg from "../assets/dune-bg.png";
import { useAuth } from "../context/AuthContext.jsx";

export default function DuneCinematic() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Manual login (works in sandbox or Codespaces)
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) return alert("Enter email");

    setUser({
      email,
      displayName: "Manual User",
      provider: "manual",
    });

    navigate("/dashboard");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden text-[#f5e1a4]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${duneBg})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-serif text-5xl tracking-widest mb-4">ARRAKIS</h1>
          <p className="mb-8 text-sm tracking-wide text-yellow-100/80">
            Fear is the mind-killer.
          </p>
          <hr />

          <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 text-black"
            />
            <button
              type="submit"
              className="bg-yellow-300 text-black px-4 py-2 mt-2"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-xs text-yellow-200/70">
            Firebase login disabled in sandbox. Use manual login.
          </p>
        </div>
      </div>
    </div>
  );
}
