// React & antd imports
import { Routes, Route, Navigate } from "react-router-dom";

// Imports of self made items
import Login from "./components/pages/Login.jsx";
import UserDashboard from "./components/pages/Dashboard.jsx";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    document.cookie.includes("token")
  );

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <UserDashboard /> : <Navigate to={"/login"} />
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to={"/dashboard"} />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
