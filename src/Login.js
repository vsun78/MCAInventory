import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimatedLogin.css';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function Login({ onLoginSuccess }) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // ✅ VALID position
  console.log("✅ Login component loaded");

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const { email, password } = loginForm;

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        onLoginSuccess();
        navigate('/inventory');
      } else {
        const result = await response.json();
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${isLoaded ? 'loaded' : ''}`} onClick={() => setIsLoaded(true)}>
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Please Sign In</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="username"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
