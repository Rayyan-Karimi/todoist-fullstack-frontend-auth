// React & antd imports
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Imports of self-made items
import Login from "./components/pages/Login.jsx";
import { validateTokenViaApi } from "./service/apiService.js";
import UserDashboard from "./components/pages/Dashboard.jsx";

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
  useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await fetch('/validate-user', {
                credentials: 'include', // Ensure cookies are sent
            });
            if (response.ok) {
                const user = await response.json();
                setUser(user); // Update user state
            } else {
                navigate('/login'); // Redirect to login
            }
        } catch (err) {
            console.error('Error checking auth:', err);
            navigate('/login');
        }
    };
    checkAuth();
}, []);
   */

  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("checking refresh");
        const tokenResponseData = await validateTokenViaApi();
        console.log("res:", await validateTokenViaApi());
        setUserData(tokenResponseData);
      } catch (error) {
        console.error("Token verification failed:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          userData !== null ? (
            <UserDashboard userData={userData} setUserData={setUserData} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          userData === null ? (
            <Login setUserData={setUserData} />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={userData ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
