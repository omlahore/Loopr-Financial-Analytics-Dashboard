import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const backgrounds = ['/bg1.png', '/bg2.png', '/bg3.png', '/bg4.png'];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left: Welcome with rotating backgrounds */}
      <div className="relative w-full md:w-1/2 h-64 md:h-full flex items-center justify-center overflow-hidden">
        {/* Backgrounds */}
        {backgrounds.map((bg, i) => (
          <div
            key={bg}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${i === bgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url(${bg})` }}
            aria-hidden={i !== bgIndex}
          />
        ))}
        {/* Black overlay */}
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-20" />
        {/* Welcome text */}
        <div className="relative z-30 flex flex-col items-center justify-center px-6 md:px-10 text-center w-full">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Welcome</h1>
          <p className="text-lg lg:text-2xl text-white/90 font-medium max-w-xl mx-auto drop-shadow">
            Unlock powerful insights into your finances. Visualize, analyze, and manage your transactions with ease and elegance. <br className="hidden lg:block" />
            Your financial journey starts here.
          </p>
        </div>
      </div>
      {/* Right: Login card */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-bg-main">
        <form
          onSubmit={handleSubmit}
          className="bg-bg-card bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center gap-6 border border-border-dark"
        >
          <img src="/Logo.png" alt="Logo" className="h-24 object-contain mb-2" style={{ width: 'auto' }} />
          <div className="text-lg text-text-muted font-medium text-center mb-2">Financial Analytics Dashboard</div>
          {error && (
            <div className="w-full bg-red-500/20 text-red-400 px-4 py-2 rounded text-sm text-center">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg bg-bg-main border border-border-dark text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green placeholder:text-text-muted"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-lg bg-bg-main border border-border-dark text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green placeholder:text-text-muted"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-accent-green text-bg-main font-semibold text-lg hover:bg-accent-green/80 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <div className="text-xs text-text-muted text-center w-full mt-2">
            Demo credentials: admin@example.com / password123
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 