import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Search,
  Mail,
  Phone,
  Calendar,
  X,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import api from '../../services/api';

export const AdminStaffPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [, setLoading] = useState(true);

  // New staff modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('RESTAURANT_MANAGER');
  const [password, setPassword] = useState('Staff@2026');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const qRole = roleFilter === 'all' ? '' : `role=${roleFilter}`;
      const qSearch = search ? `&search=${encodeURIComponent(search)}` : '';
      const res = await api.get(`/admin/users?${qRole}${qSearch}`);
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, search]);

  const handleToggleStatus = async (userId: string) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/status`);
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
        );
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to toggle user status');
    }
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setFormError('Name and email are mandatory.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');
      const res = await api.post('/admin/staff', {
        name,
        email,
        phone,
        role,
        password,
      });

      if (res.data.success) {
        setUsers((prev) => [res.data.data, ...prev]);
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.message || 'Failed to onboard staff');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case 'SUPER_ADMIN':
        return <Badge variant="gold">Grand Chancelier (Admin)</Badge>;
      case 'RESTAURANT_MANAGER':
        return <Badge variant="info">Directeur Général</Badge>;
      case 'KITCHEN_STAFF':
        return <Badge variant="warning">Executive Chef</Badge>;
      case 'RECEPTION_STAFF':
        return <Badge variant="neutral">Maître d’Hôtel</Badge>;
      case 'CUSTOMER':
        return <Badge variant="outline">Patron / Guest</Badge>;
      default:
        return <Badge variant="neutral">{r}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
            Human Capital & Access Governance
          </span>
          <h1 className="text-3xl font-serif text-white mt-1">Staff & Patron Directory</h1>
          <p className="text-sm text-neutral-400">
            Control role hierarchies, onboard culinary staff, and monitor guest accounts.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="gold" className="self-start">
          <UserPlus className="w-4 h-4 mr-2" />
          Onboard Staff
        </Button>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-neutral-800">
          {[
            { label: 'All Personnel', val: 'all' },
            { label: 'Super Admin', val: 'SUPER_ADMIN' },
            { label: 'Managers', val: 'RESTAURANT_MANAGER' },
            { label: 'Kitchen Brigade', val: 'KITCHEN_STAFF' },
            { label: 'Reception', val: 'RECEPTION_STAFF' },
            { label: 'Patrons (Customers)', val: 'CUSTOMER' },
          ].map((tab) => (
            <button
              key={tab.val}
              onClick={() => setRoleFilter(tab.val)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                roleFilter === tab.val
                  ? 'bg-[#C6A15B] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C6A15B]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-neutral-950/80 text-xs uppercase tracking-wider text-neutral-400 border-b border-neutral-800 font-semibold">
              <tr>
                <th className="py-4 px-6">Identity</th>
                <th className="py-4 px-6">Contact Coordinates</th>
                <th className="py-4 px-6">Assigned Rank</th>
                <th className="py-4 px-6">Registered</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Access Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-white">{u.name}</div>
                    <div className="text-xs text-neutral-500 font-mono">UID: {u.id}</div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <Mail className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{u.email}</span>
                    </div>
                    {u.phone && (
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{u.phone}</span>
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-6">{getRoleBadge(u.role)}</td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(u.createdAt, 'MMM d, yyyy')}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        u.isActive
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                          : 'bg-rose-950/40 text-rose-400 border-rose-800/60'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          u.isActive ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                      {u.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    {u.role !== 'SUPER_ADMIN' && (
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                          u.isActive
                            ? 'bg-neutral-800 hover:bg-rose-950/60 hover:text-rose-400 border-neutral-700'
                            : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-800'
                        }`}
                      >
                        {u.isActive ? 'Suspend' : 'Reinstate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-800 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
                Access Authorization
              </span>
              <h2 className="text-2xl font-serif text-white mt-1">
                Onboard Personnel
              </h2>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chef Jean-Luc Dupont"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Staff Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@royalfeast.com"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Assigned Operational Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="RESTAURANT_MANAGER">Restaurant Manager (Directeur Général)</option>
                  <option value="KITCHEN_STAFF">Kitchen Brigade / Executive Chef</option>
                  <option value="RECEPTION_STAFF">Reception Concierge / Maître d’Hôtel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Temporary Key / Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gold" disabled={isSubmitting}>
                  {isSubmitting ? 'Onboarding...' : 'Commission Access'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
