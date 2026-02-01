import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, setUser } = useAuth();

  const cards = [
    { title: "Documents", desc: "Personal & legal records" },
    { title: "Medical", desc: "Health history & reports" },
    { title: "Bills", desc: "Payments & subscriptions" },
    { title: "Contacts", desc: "Emergency & trusted people" },
  ];

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-black/60 text-[#f5e1a4] flex items-center justify-center">
      <div className="w-[90%] max-w-4xl border border-yellow-200/30 bg-black/60 p-10 backdrop-blur-md">
        <h1 className="font-serif text-3xl tracking-widest mb-2 text-center">
          Dashboard
        </h1>

        <p className="text-sm text-center mb-1">
          Welcome, <span className="text-yellow-300">{user?.displayName}</span>
        </p>
        <p className="text-xs text-yellow-200/60 text-center mb-10">
          {user?.email}
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative border border-yellow-300/30 bg-black/70 p-6 h-40 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-[0_0_30px_rgba(245,225,164,0.15)]"
            >
              <span className="absolute top-2 left-2 h-2 w-2 border-l border-t border-yellow-300/60" />
              <span className="absolute top-2 right-2 h-2 w-2 border-r border-t border-yellow-300/60" />
              <span className="absolute bottom-2 left-2 h-2 w-2 border-l border-b border-yellow-300/60" />
              <span className="absolute bottom-2 right-2 h-2 w-2 border-r border-b border-yellow-300/60" />

              <h2 className="font-serif text-xl tracking-wider mb-2">{card.title}</h2>
              <p className="text-xs text-yellow-200/60">{card.desc}</p>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent via-yellow-300/5 to-transparent" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleLogout}
            className="border border-yellow-300 px-8 py-2 text-xs uppercase tracking-widest transition-all duration-300 hover:bg-yellow-300 hover:text-black hover:shadow-[0_0_20px_rgba(245,225,164,0.4)]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
