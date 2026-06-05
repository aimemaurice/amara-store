import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDollarCircle, AiOutlineStar } from 'react-icons/ai';
import { FaTruck, FaCheckCircle, FaHeart, FaCreditCard } from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';
import { FiPackage, FiEdit2, FiHelpCircle } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../services/orderService';

const quickStats = [
  { label: 'To Pay', icon: AiOutlineDollarCircle, key: 'pay' },
  { label: 'To Ship', icon: FaTruck, key: 'ship' },
  { label: 'Shipped', icon: FaCheckCircle, key: 'shipped' },
  { label: 'To Review', icon: AiOutlineStar, key: 'review' },
  { label: 'Returns', icon: BiRefresh, key: 'returns' },
  { label: 'Processed', icon: FiPackage, key: 'processed' },
];

const accountMenu = [
  { label: 'Wishlist', icon: FaHeart },
  { label: 'Coupons', icon: FiPackage },
  { label: 'Payment', icon: FaCreditCard },
  { label: 'Help Center', icon: FiHelpCircle },
  { label: 'Edit Profile', icon: FiEdit2, action: 'edit' },
];

const statusStyles = {
  pending: 'bg-yellow-100 text-amber-900',
  processing: 'bg-slate-100 text-slate-900',
  shipped: 'bg-sky-100 text-sky-900',
  delivered: 'bg-emerald-100 text-emerald-900',
  cancelled: 'bg-red-100 text-red-900',
};

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeStat, setActiveStat] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [savedName, setSavedName] = useState(user?.name || '');

  useEffect(() => {
    setNameInput(user?.name || '');
    setSavedName(user?.name || '');
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (fetchError) {
        setError('Unable to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const initials = useMemo(() => {
    if (!user?.name) return 'AM';
    const parts = user.name.trim().split(' ');
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
    return `${first}${last}`.toUpperCase();
  }, [user]);

  const handleStatClick = (key) => {
    setActiveStat(key);
  };

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    setSavedName(nameInput.trim());
    setIsEditing(false);
  };

  const latestOrders = useMemo(() => {
    return orders
      .slice()
      .sort((a, b) => new Date(b.createdAt || b.updatedAt || Date.now()) - new Date(a.createdAt || a.updatedAt || Date.now()))
      .slice(0, 3);
  }, [orders]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Account Dashboard</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0] || 'Style Lover'}</h1>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="flex flex-col gap-6 pb-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200">
              <div className="flex items-center gap-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#C9A84C] text-3xl font-bold uppercase text-black shadow-lg">
                  {initials}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Your Account</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-900">{savedName || 'Fashion Insider'}</h2>
                  <p className="mt-1 text-sm text-slate-600">{user?.email || 'hello@amara.store'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-slate-900 bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-black"
              >
                Logout
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <button
                    key={stat.key}
                    type="button"
                    onClick={() => handleStatClick(stat.key)}
                    className={`group flex items-center gap-4 rounded-[1.75rem] border border-slate-200 bg-white px-5 py-4 text-left transition hover:border-[#C9A84C] hover:bg-[#f8f1d4] ${activeStat === stat.key ? 'shadow-lg' : ''}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-900 transition group-hover:bg-[#C9A84C] group-hover:text-black">
                      <Icon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{stat.label}</p>
                      <p className="mt-1 text-xs text-slate-500">Quick access</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Member rewards</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Account overview</h2>
              </div>
              <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">Premium</div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Your personal dashboard makes it easy to manage orders, track returns, and update your profile with polished account tools.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">My Orders</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Recent activity</h2>
              </div>
              <Link to="/orders" className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C] transition hover:text-black">
                View All Orders
              </Link>
            </div>

            <div className="mt-8 space-y-4">
              {loading ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">Loading orders...</div>
              ) : error ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">{error}</div>
              ) : latestOrders.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">No recent orders yet.</div>
              ) : (
                latestOrders.map((order) => {
                  const status = (order.status || 'pending').toLowerCase();
                  const badgeClass = statusStyles[status] || 'bg-slate-100 text-slate-900';
                  return (
                    <div key={order._id || order.id} className="rounded-3xl border border-slate-200 bg-white p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Order ID</p>
                          <p className="mt-1 font-semibold text-slate-900">{order._id || order.id}</p>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}>{order.status || 'Pending'}</span>
                      </div>
                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Items</p>
                          <p className="mt-1 font-semibold text-slate-900">{order.items?.length ?? 0}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total</p>
                          <p className="mt-1 font-semibold text-slate-900">${order.totalPrice?.toFixed(2) ?? '0.00'}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Date</p>
                          <p className="mt-1 font-semibold text-slate-900">{new Date(order.createdAt || order.updatedAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Account tools</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Manage your profile</h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {accountMenu.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => (item.action === 'edit' ? setIsEditing((value) => !value) : setActiveStat(item.label))}
                    className="group flex items-center gap-4 rounded-[1.75rem] border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-[#C9A84C] hover:bg-[#f8f1d4]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-900 transition group-hover:bg-[#C9A84C] group-hover:text-black">
                      <Icon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                      <p className="mt-1 text-xs text-slate-500">Quick access</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {isEditing && (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Edit profile</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">Update your name</h3>
                  </div>
                </div>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Full Name</span>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSaveName}
                  className="mt-5 inline-flex w-full justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-black"
                >
                  Save Name
                </button>
              </div>
            )}
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
