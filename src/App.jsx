import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DuneCinematic from "./pages/DuneCinematic.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { user } = useAuth();

  // Show nothing until auth state is ready
  if (user === undefined) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <DuneCinematic />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
