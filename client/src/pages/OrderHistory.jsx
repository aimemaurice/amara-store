import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Spinner from '../components/ui/Spinner';
import { getMyOrders } from '../services/orderService';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">My Orders</p>
          <h1 className="mt-4 text-4xl font-bold">Order History</h1>
        </div>
        {loading ? (
          <div className="flex justify-center py-24"><Spinner /></div>
        ) : orders.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-16 text-center">
            <h2 className="text-2xl font-semibold">No orders yet</h2>
            <p className="mt-3 text-slate-600">Your order history will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="rounded-[2rem] border border-slate-200 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500">Order ID: {order._id}</p>
                    <p className="mt-1 font-semibold">${order.totalPrice?.toFixed(2)}</p>
                  </div>
                  <span className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-black">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;