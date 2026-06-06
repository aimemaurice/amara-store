import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Spinner from '../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const statsMeta = [
  { key: 'totalOrders', label: 'Total Orders' },
  { key: 'totalRevenue', label: 'Total Revenue' },
  { key: 'totalUsers', label: 'Total Users' },
  { key: 'totalProducts', label: 'Total Products' },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const statusColors = {
  pending: '#C9A84C',
  processing: '#F5D07B',
  shipped: '#A0843D',
  delivered: '#5E4A1F',
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    ordersByStatus: [],
    recentOrders: [],
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoadingStats(true);
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (user?.role === 'admin') {
      loadStats();
    }
  }, [user]);

  const chartData = useMemo(
    () =>
      stats.ordersByStatus.map((item) => ({
        ...item,
        label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      })),
    [stats.ordersByStatus]
  );

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[calc(100vh-160px)] items-center justify-center">
          <Spinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">Admin Dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Store performance overview</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              Track orders, revenue, users, and inventory in one polished analytics experience.
            </p>
          </div>

          <section className="grid gap-6 md:grid-cols-4">
            {statsMeta.map((item) => (
              <div key={item.key} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.42em] text-[#C9A84C]">{item.label}</span>
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#C9A84C]" />
                </div>
                <p className="text-3xl font-semibold text-white">
                  {item.key === 'totalRevenue'
                    ? formatCurrency(stats[item.key])
                    : stats[item.key]}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">Orders by status</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Where the business stands today</h2>
              </div>
              <p className="text-sm text-slate-300">Data refreshed automatically for your latest order pipeline.</p>
            </div>
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    cursor={{ fill: '#ffffff10' }}
                    contentStyle={{ background: '#000', borderColor: '#333' }}
                    formatter={(value) => [value, 'Orders']}
                  />
                  <Bar dataKey="count" fill="#C9A84C" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">Recent orders</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Latest activity</h2>
              </div>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/50">
              <table className="min-w-full border-collapse text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 font-medium uppercase tracking-[0.18em] text-slate-400">Order ID</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-[0.18em] text-slate-400">Customer</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-[0.18em] text-slate-400">Total</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-[0.18em] text-slate-400">Status</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-[0.18em] text-slate-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/10 transition hover:bg-white/5">
                      <td className="px-6 py-5 font-medium text-white">{order.id.slice(-8).toUpperCase()}</td>
                      <td className="px-6 py-5">{order.customer}</td>
                      <td className="px-6 py-5 text-[#C9A84C]">{formatCurrency(order.totalPrice)}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                          order.status === 'delivered'
                            ? 'bg-emerald-500/15 text-emerald-200'
                            : order.status === 'shipped'
                            ? 'bg-sky-500/15 text-sky-200'
                            : order.status === 'processing'
                            ? 'bg-yellow-500/15 text-yellow-200'
                            : 'bg-orange-500/15 text-orange-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
