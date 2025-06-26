import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import SummaryPage from './pages/SummaryPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
// import other pages as needed

const navItems = [
  { name: 'Dashboard', path: '/', icon: '/dashboard.png' },
  { name: 'Transactions', path: '/transactions', icon: '/transactions.png' },
  { name: 'Wallet', path: '/wallet', icon: '/wallet.png' },
  { name: 'Analytics', path: '/analytics', icon: '/analytics.png' },
  { name: 'Personal', path: '/personal', icon: '/personal.png' },
  { name: 'Message', path: '/message', icon: '/message.png' },
  { name: 'Setting', path: '/setting', icon: '/setting.png' },
];

const backgrounds = ['/bg1.png', '/bg2.png', '/bg3.png', '/bg4.png'];

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Only render login page without sidebar/header
  if (location.pathname === '/login') {
    return (
      <main className="min-h-screen bg-bg-main flex items-center justify-center">
        <LoginPage />
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-main font-sans text-text-main">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-sidebar flex flex-col py-8 px-4 border-r border-border-dark">
        <div className="flex items-start justify-center mt-6 mb-10 ml-5">
          <img src="/Logo.png" alt="Logo" className="w-32 h-32 object-contain" />
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 hover:bg-bg-card ${location.pathname === item.path ? 'bg-bg-card text-accent-green' : 'text-text-muted'}`}
            >
              <img src={item.icon} alt={item.name + ' icon'} className="w-5 h-5 object-contain" />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-bg-main border-b border-border-dark">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-bg-card text-text-main rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green pr-10"
              />
              <img src="/search.png" alt="Search" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 object-contain opacity-70" />
            </div>
            <button className="bg-bg-card p-2 rounded-full hover:bg-bg-sidebar transition-colors">
              <img src="/notification.png" alt="Notifications" className="w-6 h-6 object-contain" />
            </button>
            <img
              src="/Photo.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-accent-green object-cover"
            />
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg bg-accent-green text-bg-main font-semibold hover:bg-accent-green/80 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        {/* Main routed content */}
        <main className="flex-1 bg-bg-main p-8 overflow-y-auto">
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/summary" element={<SummaryPage />} />
                    {/* Add other routes here */}
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
