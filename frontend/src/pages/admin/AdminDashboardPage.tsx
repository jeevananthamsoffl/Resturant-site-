import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export const AdminDashboardPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/analytics/overview');
      if (res.data.success) {
        setAnalytics(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-2 border-royal-gold border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-serif text-royal-gold text-sm">Aggregating Management Analytics...</p>
      </div>
    );
  }

  const { stats, weeklySales, topDishes, recentOrders } = analytics;

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      subtext: `Today: ${formatCurrency(stats.todaysRevenue)}`,
      icon: TrendingUp,
      color: 'text-royal-gold',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      subtext: `Today: ${stats.todaysOrders} orders`,
      icon: ShoppingBag,
      color: 'text-emerald-400',
    },
    {
      title: 'Pending In Kitchen',
      value: stats.pendingOrders,
      subtext: 'Requires chef preparation',
      icon: Clock,
      color: 'text-amber-400',
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      subtext: 'Delivered & dine-in served',
      icon: CheckCircle2,
      color: 'text-sky-400',
    },
    {
      title: 'Registered Patrons',
      value: stats.totalCustomers,
      subtext: 'Active culinary accounts',
      icon: Users,
      color: 'text-indigo-400',
    },
    {
      title: "Today's Table Bookings",
      value: stats.todaysReservations,
      subtext: 'Reserved evening seatings',
      icon: Calendar,
      color: 'text-rose-400',
    },
  ];

  const maxWeeklyRevenue = Math.max(...weeklySales.map((d: any) => d.revenue));

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">
            Executive Command Center
          </Badge>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Operational Overview & Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchOverview} icon={RefreshCw}>
            Refresh Realtime
          </Button>
          <Link to="/admin/orders">
            <Button variant="gold" size="sm" icon={ShoppingBag}>
              Manage Live Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* 6 Metric Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-royal-charcoal p-5 rounded-xl border border-white/5 hover:border-royal-gold/40 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider text-royal-muted font-medium">
                  {card.title}
                </span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-[10px] text-royal-muted font-light">{card.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Top Dishes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weekly Revenue Visual Bar Chart */}
        <div className="lg:col-span-8 bg-royal-charcoal p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Weekly Revenue Trajectory</h3>
              <p className="text-xs text-royal-muted font-light">Gross culinary revenues & orders</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-royal-gold" />
              <span className="text-xs text-royal-muted">Gross Revenue (₹)</span>
            </div>
          </div>

          {/* Pure SVG/CSS Interactive Bar Visualization */}
          <div className="pt-4 flex items-end justify-between gap-3 h-56">
            {weeklySales.map((day: any) => {
              const heightPercent = Math.round((day.revenue / maxWeeklyRevenue) * 100);
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-royal-gold bg-royal-dark px-1.5 py-0.5 rounded border border-white/10 whitespace-nowrap">
                    {formatCurrency(day.revenue)}
                  </div>
                  <div
                    className="w-full max-w-[48px] bg-gradient-to-t from-royal-gold/40 to-royal-gold rounded-t-md transition-all duration-500 group-hover:from-royal-gold group-hover:to-royal-gold-light group-hover:shadow-gold-glow"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs font-mono text-royal-muted mt-1 font-medium">
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/5 text-xs text-royal-muted">
            <span>Peak Commercial Day: <strong>Saturday (₹1,12,000)</strong></span>
            <span>Average Daily Turn: <strong>₹70,742</strong></span>
          </div>
        </div>

        {/* Best-Selling Culinary Delicacies */}
        <div className="lg:col-span-4 bg-royal-charcoal p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-royal-gold" /> Best-Sellers
            </h3>
            <Link to="/admin/menu" className="text-xs text-royal-gold hover:underline">
              All Dishes
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {topDishes.map((dish: any, idx: number) => (
              <div key={dish.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-royal-dark border border-royal-gold/30 flex items-center justify-center font-mono text-[10px] text-royal-gold shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate">{dish.name}</p>
                    <p className="text-[11px] text-royal-muted">{dish.category}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-royal-gold font-semibold">{formatCurrency(dish.price)}</p>
                  <p className="text-[10px] text-emerald-400">{dish.ordersCount} ordered</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-royal-charcoal p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Recent Customer Orders</h3>
            <p className="text-xs text-royal-muted font-light">Latest live transactions across channels</p>
          </div>
          <Link to="/admin/orders">
            <Button variant="outline" size="sm" icon={ArrowUpRight} iconPosition="right">
              View All Orders
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-royal-muted">
            <thead className="bg-royal-dark/60 text-white uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Order Ref</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Fulfillment</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.map((ord: any) => (
                <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 font-mono text-royal-gold font-bold">
                    {ord.orderNumber}
                  </td>
                  <td className="p-3.5 text-white">
                    <p className="font-medium">{ord.customerName}</p>
                    <p className="text-[11px] text-royal-muted">{ord.customerPhone}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-semibold text-white/80">
                      {ord.orderType}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-white font-bold">
                    {formatCurrency(ord.totalAmount)}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ord.paymentStatus === 'PAID'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-royal-dark text-royal-gold border border-royal-gold/20">
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      to={`/orders/${ord.orderNumber}/track`}
                      className="p-1.5 rounded hover:bg-royal-dark text-royal-gold inline-flex"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
