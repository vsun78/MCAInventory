import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Login';
import App from './App';

// ✅ Create wrapper to allow useLocation() outside <Router>
function MainWrapper() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  console.log("✅ Main rendering, auth =", authenticated);
  console.log("📍 Current path:", location.pathname);

  const ProtectedRoute = ({ children }) => {
    console.log("🔐 ProtectedRoute, auth =", authenticated);
    return authenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLoginSuccess={() => setAuthenticated(true)} />} />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default MainWrapper;
