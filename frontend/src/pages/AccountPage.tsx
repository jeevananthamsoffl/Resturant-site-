import React, { useState } from 'react';
import {
  User as UserIcon,
  Shield,
  Key,
  LogOut,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Link } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, login, register, logout, updateProfile } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile Edit state
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      setSuccessMsg('Welcome back to Royal Feast!');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);
    try {
      await register(name, email, password, phone);
      setSuccessMsg('Your aristocratic account has been established!');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);
    try {
      await updateProfile({ name: editName, phone: editPhone });
      setSuccessMsg('Profile updated successfully');
      setIsEditing(false);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCreds = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setAuthMode('login');
  };

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* Page Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge variant="gold" size="md">
            {isAuthenticated ? 'Privileged Guest Portal' : 'Member Access'}
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {isAuthenticated ? `Welcome, ${user?.name}` : 'Royal Feast Membership'}
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-royal-muted font-light">
            {isAuthenticated
              ? 'Manage your personalized gastronomic preferences, order tracking, and table reservations.'
              : 'Sign in to access exclusive sommelier reservations, past orders, and tasting menus.'}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isAuthenticated && user ? (
          /* Logged In Dashboard View */
          <div className="space-y-8">
            {/* User Profile Card */}
            <div className="bg-royal-charcoal rounded-2xl p-8 border border-royal-gold/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-royal-dark border border-royal-gold flex items-center justify-center text-royal-gold shadow-gold-glow">
                    <UserIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-2xl font-bold text-white">{user.name}</h2>
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-royal-gold/15 text-royal-gold border border-royal-gold/30 font-semibold font-mono">
                        {user.role}
                      </span>
                    </div>
                    <p className="text-xs text-royal-muted flex items-center gap-2 mt-1">
                      <Mail className="w-3.5 h-3.5 text-royal-gold" /> {user.email}
                      {user.phone && (
                        <>
                          <span>•</span>
                          <Phone className="w-3.5 h-3.5 text-royal-gold" /> {user.phone}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {user.role === 'SUPER_ADMIN' || user.role === 'RESTAURANT_MANAGER' ? (
                    <Link to="/admin">
                      <Button variant="gold" size="sm" icon={Shield}>
                        Admin Portal
                      </Button>
                    </Link>
                  ) : null}
                  <Button variant="outline" size="sm" onClick={logout} icon={LogOut}>
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* Edit Profile Form */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-white">Profile Details</h3>
                  <button
                    onClick={() => {
                      setEditName(user.name);
                      setEditPhone(user.phone || '');
                      setIsEditing(!isEditing);
                    }}
                    className="text-xs text-royal-gold hover:underline font-medium"
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Information'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg">
                    {errorMsg && (
                      <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded border border-rose-800">
                        {errorMsg}
                      </p>
                    )}
                    {successMsg && (
                      <p className="text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-800">
                        {successMsg}
                      </p>
                    )}
                    <div>
                      <label className="block text-xs text-royal-muted mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-royal-dark border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-royal-muted mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full bg-royal-dark border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                    <Button variant="gold" size="sm" isLoading={isSubmitting}>
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-lg bg-royal-dark border border-white/5">
                      <span className="text-royal-muted block mb-1">Member Since</span>
                      <span className="font-mono text-white font-medium">November 2026</span>
                    </div>
                    <div className="p-4 rounded-lg bg-royal-dark border border-white/5">
                      <span className="text-royal-muted block mb-1">Tier Level</span>
                      <span className="text-royal-gold font-semibold uppercase tracking-wider">
                        Imperial Patron
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-royal-dark border border-white/5">
                      <span className="text-royal-muted block mb-1">Table Reservations</span>
                      <span className="text-white font-mono">1 Confirmed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-royal-charcoal/80 border border-white/5 space-y-3">
                <div className="flex items-center gap-2.5 text-royal-gold">
                  <Calendar className="w-5 h-5" />
                  <h4 className="font-serif text-base font-bold text-white">Upcoming Seatings</h4>
                </div>
                <p className="text-xs text-royal-muted font-light leading-relaxed">
                  View table booking details, change seating requests, or cancel upcoming dinner reservations.
                </p>
                <Link to="/reservations" className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Book New Table
                  </Button>
                </Link>
              </div>

              <div className="p-6 rounded-xl bg-royal-charcoal/80 border border-white/5 space-y-3">
                <div className="flex items-center gap-2.5 text-royal-gold">
                  <ShoppingBag className="w-5 h-5" />
                  <h4 className="font-serif text-base font-bold text-white">Culinary Orders</h4>
                </div>
                <p className="text-xs text-royal-muted font-light leading-relaxed">
                  Order delivery or takeaway of your preferred royal curations directly to your residence.
                </p>
                <Link to="/menu" className="block pt-2">
                  <Button variant="gold" size="sm" className="w-full">
                    Order Gourmet Food
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Authentication Form (Login / Register) */
          <div className="bg-royal-charcoal rounded-2xl p-8 sm:p-12 border border-royal-gold/30 shadow-2xl max-w-xl mx-auto">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center border-b border-white/10 mb-8">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
                  authMode === 'login'
                    ? 'border-royal-gold text-royal-gold'
                    : 'border-transparent text-royal-muted hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
                  authMode === 'register'
                    ? 'border-royal-gold text-royal-gold'
                    : 'border-transparent text-royal-muted hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-3 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
                {successMsg}
              </div>
            )}

            {authMode === 'login' ? (
              /* Login Form */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="concierge@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1.5 font-medium">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="md"
                  className="w-full mt-4"
                  isLoading={isSubmitting}
                  icon={Key}
                >
                  Sign In to Royal Feast
                </Button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady / Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="concierge@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1.5 font-medium">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1.5 font-medium">
                    Create Password (min. 6 characters) *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="md"
                  className="w-full mt-4"
                  isLoading={isSubmitting}
                  icon={CheckCircle2}
                >
                  Complete Registration
                </Button>
              </form>
            )}

            {/* Quick Demo Credentials Autofill Banner */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-royal-gold block mb-2 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Instant Demo Role Access (Click to autofill):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoCreds('admin@royalfeast.com', 'RoyalAdmin#2026')}
                  className="p-2 rounded bg-royal-dark border border-white/5 hover:border-royal-gold/40 text-left transition-colors"
                >
                  <p className="text-[11px] font-bold text-white">Super Admin</p>
                  <p className="text-[10px] text-royal-gold font-mono truncate">admin@royalfeast.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCreds('manager@royalfeast.com', 'RoyalManager#2026')}
                  className="p-2 rounded bg-royal-dark border border-white/5 hover:border-royal-gold/40 text-left transition-colors"
                >
                  <p className="text-[11px] font-bold text-white">Manager</p>
                  <p className="text-[10px] text-royal-gold font-mono truncate">manager@royalfeast.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCreds('customer@royalfeast.com', 'RoyalCustomer#2026')}
                  className="p-2 rounded bg-royal-dark border border-white/5 hover:border-royal-gold/40 text-left transition-colors"
                >
                  <p className="text-[11px] font-bold text-white">Patron Guest</p>
                  <p className="text-[10px] text-royal-gold font-mono truncate">customer@royalfeast.com</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
