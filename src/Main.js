// Main.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Login';
import App from './App';
import SerialNumberPage from './SerialNumberPage';

// This wraps Main so we can use useLocation
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

  console.log("🧠 Main.js loaded");
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
      <Route 
  path="/serials/:itemId" 
  element={
    <ProtectedRoute>
      <SerialNumberPage />
    </ProtectedRoute>
  } 
/>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default MainWrapper; // This is what index.js imports
