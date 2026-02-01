import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
<<<<<<< HEAD
import axios from "axios"
=======
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015

import DuneCinematic from "./pages/DuneCinematic";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
<<<<<<< HEAD
  
    const unsub = onAuthStateChanged(auth, async (u) => {
    setUser(u);

    if (u) {
      const token = await u.getIdToken();
      const res = await axios.post("/api/routers/firebaseauth",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
    }
    // else {
    //       // 🔐 Custom session login (email/password)
    //       // const res = await axios.get("/api/auth/me", {
    //       //   withCredentials: true,
    //       // });

    //       setUser(res.data || null);
    //   } 
      // else  {
      //   setUser(null);
      // }
  });
=======
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015
    return () => unsub();
  }, []);

  // Loading state
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

export default App;
