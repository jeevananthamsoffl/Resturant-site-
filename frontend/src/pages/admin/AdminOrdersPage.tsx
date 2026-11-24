import React, { useState, useEffect } from 'react';
import {
  Search,
  Truck,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  X,
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import api from '../../services/api';

const ORDER_STATUSES = [
  'ALL',
  'PENDING',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'COMPLETED',
  'CANCELLED',
];

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const qStatus = statusFilter === 'ALL' ? '' : `status=${statusFilter}`;
      const qSearch = search ? `&search=${encodeURIComponent(search)}` : '';
      const res = await api.get(`/admin/orders?${qStatus}${qSearch}`);
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, search]);

  const handleUpdateStatus = async (orderNumber: string, nextStatus: string) => {
    try {
      setUpdating(orderNumber);
      const res = await api.patch(`/admin/orders/${orderNumber}/status`, { status: nextStatus });
      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status: nextStatus } : o))
        );
        if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
          setSelectedOrder({ ...selectedOrder, status: nextStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>;
      case 'CONFIRMED':
        return <Badge variant="gold">Confirmed</Badge>;
      case 'PREPARING':
        return <Badge variant="info">In Kitchen</Badge>;
      case 'READY':
        return <Badge variant="gold">Ready for Pickup</Badge>;
      case 'OUT_FOR_DELIVERY':
        return <Badge variant="info">En Route</Badge>;
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
            Operations Console
          </span>
          <h1 className="text-3xl font-serif text-white mt-1">Culinary Order Management</h1>
          <p className="text-sm text-neutral-400">
            Monitor incoming banquet & delivery orders, coordinate kitchen dispatch and verify settlements.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-neutral-800">
          {ORDER_STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#C6A15B] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search order #, customer, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C6A15B]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-neutral-950/80 text-xs uppercase tracking-wider text-neutral-400 border-b border-neutral-800 font-semibold">
              <tr>
                <th className="py-4 px-6">Order ID & Date</th>
                <th className="py-4 px-6">Guest Info</th>
                <th className="py-4 px-6">Mode</th>
                <th className="py-4 px-6">Dishes</th>
                <th className="py-4 px-6">Grand Total</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Dispatch Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No orders match your current filters.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-neutral-800/40 transition-colors cursor-pointer group"
                    onClick={() => setSelectedOrder(o)}
                  >
                    <td className="py-4 px-6">
                      <div className="font-mono font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                        {o.orderNumber}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {formatDate(o.createdAt, 'MMM d, yyyy h:mm a')}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{o.customerName}</div>
                      <div className="text-xs text-neutral-400">{o.customerPhone}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`text-xs px-2.5 py-1 rounded border ${
                          o.orderType === 'DELIVERY'
                            ? 'bg-amber-950/20 text-[#DFBE79] border-amber-900/40'
                            : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                        }`}
                      >
                        {o.orderType}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-xs text-neutral-300 line-clamp-1">
                        {o.items?.map((it: any) => `${it.quantity}x ${it.nameSnapshot || it.name}`).join(', ')}
                      </div>
                      <div className="text-xs text-neutral-500">{o.items?.length || 0} item(s)</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{formatCurrency(o.totalAmount)}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[#C6A15B]">
                        {o.paymentMethod} • {o.paymentStatus}
                      </div>
                    </td>

                    <td className="py-4 px-6">{getStatusBadge(o.status)}</td>

                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {o.status === 'PENDING' && (
                          <button
                            onClick={() => handleUpdateStatus(o.orderNumber, 'CONFIRMED')}
                            disabled={updating === o.orderNumber}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-[#C6A15B] hover:text-black border border-neutral-700 rounded text-xs transition-colors"
                          >
                            Accept
                          </button>
                        )}

                        {o.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleUpdateStatus(o.orderNumber, 'PREPARING')}
                            disabled={updating === o.orderNumber}
                            className="px-2.5 py-1 bg-amber-900/40 hover:bg-amber-800 text-[#DFBE79] border border-amber-800/60 rounded text-xs transition-colors"
                          >
                            Send to Kitchen
                          </button>
                        )}

                        {o.status === 'PREPARING' && (
                          <button
                            onClick={() => handleUpdateStatus(o.orderNumber, 'READY')}
                            disabled={updating === o.orderNumber}
                            className="px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-800 text-emerald-400 border border-emerald-800/60 rounded text-xs transition-colors"
                          >
                            Mark Ready
                          </button>
                        )}

                        {o.status === 'READY' && o.orderType === 'DELIVERY' && (
                          <button
                            onClick={() => handleUpdateStatus(o.orderNumber, 'OUT_FOR_DELIVERY')}
                            disabled={updating === o.orderNumber}
                            className="px-2.5 py-1 bg-sky-950/40 hover:bg-sky-800 text-sky-400 border border-sky-800/60 rounded text-xs transition-colors"
                          >
                            Dispatch Courier
                          </button>
                        )}

                        {(o.status === 'READY' || o.status === 'OUT_FOR_DELIVERY') && (
                          <button
                            onClick={() => handleUpdateStatus(o.orderNumber, 'COMPLETED')}
                            disabled={updating === o.orderNumber}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium transition-colors"
                          >
                            Fulfill
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedOrder(o)}
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

      {/* Order Detail Modal Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-800 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
                Order Specification
              </span>
              <h2 className="text-2xl font-serif text-white mt-1">
                {selectedOrder.orderNumber}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                <span>Booked: {formatDate(selectedOrder.createdAt, 'PPpp')}</span>
                <span>•</span>
                <span>{getStatusBadge(selectedOrder.status)}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                  Client Credentials
                </h4>
                <div className="space-y-1.5 text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span className="font-medium text-white">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span className="truncate">{selectedOrder.customerEmail}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                  Fulfillment & Address
                </h4>
                <div className="space-y-1.5 text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Fulfillment: <strong className="text-white">{selectedOrder.orderType}</strong></span>
                  </div>
                  {selectedOrder.orderType === 'DELIVERY' && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A15B] mt-0.5" />
                      <span className="text-xs text-neutral-400">
                        {selectedOrder.deliveryAddress?.street},{' '}
                        {selectedOrder.deliveryAddress?.city}{' '}
                        {selectedOrder.deliveryAddress?.postalCode}
                      </span>
                    </div>
                  )}
                  {selectedOrder.specialInstructions && (
                    <div className="text-xs italic text-amber-300/80 mt-1">
                      Note: "{selectedOrder.specialInstructions}"
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Line items snapshot */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Bespoke Selection Items
              </h4>
              <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                {selectedOrder.items?.map((it: any, idx: number) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium text-white">
                        {it.quantity}x {it.nameSnapshot || it.name}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {formatCurrency(it.price)} each
                      </div>
                    </div>
                    <div className="font-mono text-neutral-200">
                      {formatCurrency(it.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial ledger breakdown */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 text-sm mb-6">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Courtesy Discount ({selectedOrder.couponCode})</span>
                  <span>-{formatCurrency(selectedOrder.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Imperial GST (5%)</span>
                <span>{formatCurrency(selectedOrder.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Chauffeur Delivery Fee</span>
                <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
              </div>
              <div className="border-t border-neutral-800 pt-2 flex justify-between text-base font-semibold text-white">
                <span className="text-[#C6A15B] font-serif">Grand Settlement</span>
                <span className="font-mono">{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Quick Transition Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800">
              <div className="text-xs text-neutral-400">
                Manual Override:
              </div>
              <div className="flex flex-wrap gap-2">
                {['CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.orderNumber, st)}
                    disabled={selectedOrder.status === st || updating === selectedOrder.orderNumber}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedOrder.status === st
                        ? 'bg-[#C6A15B] text-black font-semibold'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
