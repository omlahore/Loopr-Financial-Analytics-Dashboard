import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const backgrounds = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg'];

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
            style={{ backgroundImage: `url(${bg})`, backgroundColor: '#222' }}
            aria-hidden={i !== bgIndex}
          />
        ))}
        {/* Black overlay (increased opacity) */}
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-80 z-20" />
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
          className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6 border border-solid border-transparent bg-clip-padding"
          style={{
            border: '1.5px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(34,229,132,0.08) 100%)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <img src="/Logo.png" alt="Logo" className="h-14 object-contain mb-2 drop-shadow-lg rounded-xl border border-white/30 bg-white/10 p-2" style={{ width: 'auto', boxShadow: '0 2px 16px 0 rgba(34,229,132,0.15)' }} />
          <div className="text-lg text-text-muted font-semibold text-center mb-2 tracking-wide">Financial Analytics Dashboard</div>
          {error && (
            <div className="w-full bg-red-500/20 text-red-400 px-4 py-2 rounded text-sm text-center shadow">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green placeholder:text-text-muted shadow-sm transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green placeholder:text-text-muted shadow-sm transition-all duration-200"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent-green text-bg-main font-semibold text-lg shadow-lg hover:bg-accent-green/90 hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-accent-green/60 focus:outline-none"
            disabled={loading}
            style={{ boxShadow: '0 2px 16px 0 rgba(34,229,132,0.15)' }}
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