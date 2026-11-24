import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  X,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import api from '../../services/api';

const RESERVATION_STATUSES = ['ALL', 'CONFIRMED', 'PENDING', 'SEATED', 'COMPLETED', 'CANCELLED'];

export const AdminReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedRes, setSelectedRes] = useState<any | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      const qStatus = statusFilter === 'ALL' ? '' : `status=${statusFilter}`;
      const qDate = dateFilter ? `&date=${dateFilter}` : '';
      const qSearch = search ? `&search=${encodeURIComponent(search)}` : '';
      const res = await api.get(`/admin/reservations?${qStatus}${qDate}${qSearch}`);
      if (res.data.success) {
        setReservations(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [statusFilter, dateFilter, search]);

  const handleUpdateStatus = async (code: string, nextStatus: string) => {
    try {
      setUpdating(code);
      const res = await api.patch(`/admin/reservations/${code}/status`, { status: nextStatus });
      if (res.data.success) {
        setReservations((prev) =>
          prev.map((r) => (r.reservationCode === code ? { ...r, status: nextStatus } : r))
        );
        if (selectedRes && selectedRes.reservationCode === code) {
          setSelectedRes({ ...selectedRes, status: nextStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update reservation status:', err);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge variant="gold">Confirmed</Badge>;
      case 'PENDING':
        return <Badge variant="warning">Pending Approval</Badge>;
      case 'SEATED':
        return <Badge variant="info">Seated at Table</Badge>;
      case 'COMPLETED':
        return <Badge variant="success">Completed</Badge>;
      case 'CANCELLED':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
            Maître d’Hôtel Console
          </span>
          <h1 className="text-3xl font-serif text-white mt-1">Table Reservations & Seating</h1>
          <p className="text-sm text-neutral-400">
            Orchestrate VIP table allocations, salon dining requests, and guest arrivals.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-neutral-800">
          {RESERVATION_STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#C6A15B] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#C6A15B]"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Clear Date
            </button>
          )}

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search code, guest name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C6A15B]"
            />
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-neutral-950/80 text-xs uppercase tracking-wider text-neutral-400 border-b border-neutral-800 font-semibold">
              <tr>
                <th className="py-4 px-6">Booking Reference</th>
                <th className="py-4 px-6">Guest Patron</th>
                <th className="py-4 px-6">Date & Slot</th>
                <th className="py-4 px-6">Party Size</th>
                <th className="py-4 px-6">Seating Zone</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Concierge Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No reservations matching current criteria.
                  </td>
                </tr>
              ) : (
                reservations.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-neutral-800/40 transition-colors cursor-pointer group"
                    onClick={() => setSelectedRes(r)}
                  >
                    <td className="py-4 px-6">
                      <div className="font-mono font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                        {r.reservationCode}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Requested: {formatDate(r.createdAt, 'MMM d, yyyy')}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{r.guestName}</div>
                      <div className="text-xs text-neutral-400">{r.guestPhone}</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-white font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span>{r.reservationDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Clock className="w-3 h-3" />
                        <span>{r.reservationTime}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-white font-medium">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{r.partySize} Guests</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-xs px-2.5 py-1 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
                        {r.seatingPreference || 'Standard Table'}
                      </span>
                    </td>

                    <td className="py-4 px-6">{getStatusBadge(r.status)}</td>

                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {r.status === 'PENDING' && (
                          <button
                            onClick={() => handleUpdateStatus(r.reservationCode, 'CONFIRMED')}
                            disabled={updating === r.reservationCode}
                            className="px-2.5 py-1 bg-[#C6A15B] hover:bg-[#DFBE79] text-black font-semibold rounded text-xs transition-colors"
                          >
                            Approve
                          </button>
                        )}

                        {r.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleUpdateStatus(r.reservationCode, 'SEATED')}
                            disabled={updating === r.reservationCode}
                            className="px-2.5 py-1 bg-sky-900/40 hover:bg-sky-800 text-sky-400 border border-sky-800/60 rounded text-xs transition-colors"
                          >
                            Seat Guests
                          </button>
                        )}

                        {r.status === 'SEATED' && (
                          <button
                            onClick={() => handleUpdateStatus(r.reservationCode, 'COMPLETED')}
                            disabled={updating === r.reservationCode}
                            className="px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-800 text-emerald-400 border border-emerald-800/60 rounded text-xs transition-colors"
                          >
                            Complete
                          </button>
                        )}

                        {r.status !== 'CANCELLED' && r.status !== 'COMPLETED' && (
                          <button
                            onClick={() => handleUpdateStatus(r.reservationCode, 'CANCELLED')}
                            disabled={updating === r.reservationCode}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-rose-950/60 hover:text-rose-400 border border-neutral-700 rounded text-xs transition-colors"
                          >
                            Decline
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedRes(r)}
                          className="p-1 hover:text-[#C6A15B] text-neutral-400 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reservation Detail Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedRes(null)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-800 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
                Table Reservation Dossier
              </span>
              <h2 className="text-2xl font-serif text-white mt-1">
                Ref: {selectedRes.reservationCode}
              </h2>
              <div className="mt-2">{getStatusBadge(selectedRes.status)}</div>
            </div>

            <div className="space-y-4 text-sm text-neutral-300">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Patron Name:</span>
                  <span className="text-white font-medium">{selectedRes.guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Phone:</span>
                  <span className="text-white">{selectedRes.guestPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Email:</span>
                  <span className="text-white">{selectedRes.guestEmail}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Date</div>
                  <div className="text-white font-medium mt-1">{selectedRes.reservationDate}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Slot Time</div>
                  <div className="text-white font-medium mt-1">{selectedRes.reservationTime}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Party Size</div>
                  <div className="text-white font-medium mt-1">{selectedRes.partySize} Persons</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Seating Chamber</div>
                  <div className="text-[#C6A15B] font-medium mt-1">
                    {selectedRes.seatingPreference || 'Imperial Dining Hall'}
                  </div>
                </div>
              </div>

              {selectedRes.specialRequests && (
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                    Special Requests / Dietary Protocol:
                  </div>
                  <p className="text-sm italic text-amber-300/90">
                    "{selectedRes.specialRequests}"
                  </p>
                </div>
              )}
            </div>

            {/* Quick Status Override */}
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-neutral-800 justify-end">
              {['CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => handleUpdateStatus(selectedRes.reservationCode, st)}
                  disabled={selectedRes.status === st || updating === selectedRes.reservationCode}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedRes.status === st
                      ? 'bg-[#C6A15B] text-black font-semibold'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
