import "./App.css";
import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import {useQuery, useQueryClient} from '@tanstack/react-query'
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";


function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("https://deployment-z54s.onrender.com/api/auth/me", {
          method: 'GET',
          credentials: 'include',  // Ensures cookies are included in the request
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) return <p style={{textAlign:"center", width:"100vw"}}>Loading...</p>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
        <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
        <Route
            path="/dashboard"
            element={authUser ? <Dashboard  authUser={authUser}/> : <Navigate to="/login" />}
          />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
