import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Dashboard() {
  const user = auth.currentUser;

  return (
    <div className="min-h-screen bg-black text-[#f5e1a4] flex items-center justify-center">
      <div className="w-[90%] max-w-xl border border-yellow-200/30 bg-black/60 p-8 text-center backdrop-blur-md">

        <h1 className="font-serif text-3xl tracking-widest mb-4">
          Dashboard
        </h1>

        <p className="text-sm mb-2">
          Welcome, <span className="text-yellow-300">{user?.displayName}</span>
        </p>

        <p className="text-xs text-yellow-200/60 mb-6">
          {user?.email}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-yellow-200/20 p-4 text-xs">
            Feature 1
          </div>
          <div className="border border-yellow-200/20 p-4 text-xs">
            Feature 2
          </div>
        </div>

        <button
          onClick={() => signOut(auth)}
          className="border border-yellow-300 px-6 py-2 text-xs uppercase tracking-widest hover:bg-yellow-300 hover:text-black transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
