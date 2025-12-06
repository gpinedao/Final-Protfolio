import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        'https://final-protfolio.onrender.com/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // ✅ Validate token
      if (!res.data?.token) {
        alert('Login response missing token');
        return;
      }

      // ✅ Save token
      localStorage.setItem('token', res.data.token);

      // ✅ Save user object (if provided)
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // ✅ Save role (admin or user)
        localStorage.setItem('role', res.data.user.role);
      } else {
        // ✅ Fallback for safety
        localStorage.setItem('user', '{}');
        localStorage.setItem('role', 'user');
      }

      console.log('Login successful, token:', res.data.token);
      navigate('/');

    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        'Login failed';

      console.error('Login failed:', msg);
      alert(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default SignIn;