import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Crown,
  LayoutDashboard,
  UtensilsCrossed,
  FolderTree,
  ShoppingBag,
  Calendar,
  Users,
  Tag,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Key,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';

export const AdminLayout: React.FC = () => {
  const { user, logout, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick login modal if not logged in
  const [loginEmail, setLoginEmail] = useState('admin@royalfeast.com');
  const [loginPassword, setLoginPassword] = useState('RoyalAdmin#2026');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      setLoginError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Menu Items', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Live Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Table Reservations', path: '/admin/reservations', icon: Calendar },
    { name: 'Staff & Roles', path: '/admin/staff', icon: Users },
    { name: 'Offers & Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Restaurant Settings', path: '/admin/settings', icon: Settings },
  ];

  const isStaffOrAdmin =
    user && ['SUPER_ADMIN', 'RESTAURANT_MANAGER', 'KITCHEN_STAFF', 'RECEPTION_STAFF'].includes(user.role);

  if (!isStaffOrAdmin) {
    return (
      <div className="min-h-screen bg-royal-dark text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-royal-charcoal p-8 sm:p-10 rounded-2xl border border-royal-gold/40 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-royal-dark border border-royal-gold flex items-center justify-center text-royal-gold mx-auto shadow-gold-glow">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Staff & Admin Gateway</h2>
            <p className="text-xs text-royal-muted mt-1 font-light">
              Authentication with verified executive credentials required to access the restaurant
              management suite.
            </p>
          </div>

          {loginError && (
            <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded border border-rose-900">
              {loginError}
            </p>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-royal-muted mb-1">
                Admin / Staff Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-royal-muted mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
              />
            </div>
            <Button variant="gold" size="md" className="w-full" isLoading={isLoggingIn} icon={Key}>
              Authenticate Staff Session
            </Button>
          </form>

          <div className="pt-2 border-t border-white/10">
            <Link
              to="/"
              className="text-xs text-royal-gold hover:underline inline-flex items-center gap-1.5"
            >
              Return to Customer Dining Site <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-royal-dark text-white flex flex-col lg:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-royal-charcoal flex-col justify-between border-r border-royal-gold/20 shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-royal-dark border border-royal-gold flex items-center justify-center text-royal-gold">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-white block">
                ROYAL FEAST
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-royal-gold font-light">
                Management Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-royal-gold text-royal-dark font-bold shadow-gold-glow'
                      : 'text-royal-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-royal-gold hover:underline p-2 rounded hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> Customer Website
            </span>
          </Link>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-royal-gold font-mono uppercase">{user?.role}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="text-white/40 hover:text-rose-400 p-1.5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar for Mobile/Tablet */}
        <header className="lg:hidden bg-royal-charcoal border-b border-royal-gold/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Crown className="w-5 h-5 text-royal-gold" />
            <span className="font-serif text-lg font-bold text-white">ROYAL FEAST ADMIN</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-royal-gold"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-royal-charcoal border-b border-royal-gold/20 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded text-xs uppercase tracking-wider text-white hover:text-royal-gold hover:bg-royal-dark"
                >
                  <Icon className="w-4 h-4 text-royal-gold" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
              <Link to="/" className="text-royal-gold">
                Customer Site
              </Link>
              <button onClick={logout} className="text-rose-400">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Content View Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
