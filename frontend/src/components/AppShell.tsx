import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AppShellProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: '🏠' },
  { name: 'Transactions', path: '/transactions', icon: '💸' },
  { name: 'Summary', path: '/summary', icon: '📊' },
];

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-bg-main font-sans text-text-main">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-sidebar flex flex-col py-8 px-4 border-r border-border-dark">
        <div className="flex items-center mb-10">
          <span className="text-3xl font-bold text-accent-green mr-2">J</span>
          <span className="text-xl font-bold tracking-wide">Penta</span>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 hover:bg-bg-card ${location.pathname === item.path ? 'bg-bg-card text-accent-green' : 'text-text-muted'}`}
            >
              <span className="w-5 h-5 inline-block">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-bg-main border-b border-border-dark">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-text-muted">Welcome, {user?.name || 'User'}</span>
            <button
              onClick={handleLogout}
              className="bg-accent-green text-bg-main px-4 py-2 rounded-lg font-semibold hover:bg-accent-green/80 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        {/* Main routed content */}
        <main className="flex-1 bg-bg-main p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
