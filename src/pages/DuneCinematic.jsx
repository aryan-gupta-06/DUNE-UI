import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import duneBg from "../assets/dune-bg.png";
<<<<<<< HEAD
import axios from "axios"
=======
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015

export default function DuneCinematic() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
=======
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        navigate("/dashboard");
      }
    });
    return () => unsub();
  }, [navigate]);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google authentication failed");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // const handleLogin = async () => {
  //   try {
  //     const res = await axios.post(
  //       "/api/routers/register",
  //       {
  //         email,
  //         password
  //       }
  //     );
    
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err.response?.data || err.message);
  //   }

  // }
  const emailLogin = async (e) => {
    e.preventDefault();
    await axios.post(
      "/api/routers/register",
      { email, password },
      { withCredentials: true }
    );
    window.location.reload(); // triggers auth check
  };
=======
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015
  return (
    <div className="relative h-screen w-full overflow-hidden text-[#f5e1a4]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${duneBg})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Sandstorm */}
      {[...Array(35)].map((_, i) => (
        <span
          key={i}
<<<<<<< HEAD
          className="absolute h-0.5 w-30 bg-yellow-200/20 animate-sandstorm"
=======
          className="absolute h-[2px] w-[120px] bg-yellow-200/20 animate-sandstorm"
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015
          style={{
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
          }}
        />
      ))}

      {/* Spice particles */}
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-yellow-300 blur-sm animate-spice"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-6">

          <h1 className="font-serif text-5xl tracking-widest mb-4">
            ARRAKIS
          </h1>

<<<<<<< HEAD

          <p className="mb-8 text-sm tracking-wide text-yellow-100/80">
            Fear is the mind-killer.
          </p>
           <hr />

      <form onSubmit={emailLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" >Login</button>
      </form>
=======
          <p className="mb-8 text-sm tracking-wide text-yellow-100/80">
            Fear is the mind-killer.
          </p>
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015

          {!user && (
            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="border border-yellow-300 px-8 py-3 text-xs uppercase tracking-widest transition hover:bg-yellow-300 hover:text-black"
            >
              {loading ? "Summoning Spice..." : "Continue with Google"}
            </button>
          )}

        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes sandstorm {
          from { transform: translateX(-150px); }
          to { transform: translateX(120vw); }
        }
        .animate-sandstorm {
          animation: sandstorm linear infinite;
        }

        @keyframes spice {
          0% { opacity: 0; transform: translateY(0) scale(0.6); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-120px) scale(1.4); }
        }
        .animate-spice {
          animation: spice 6s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}
