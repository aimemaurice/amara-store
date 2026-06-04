import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    if (user) {
      setForm((current) => ({ ...current, name: user.name || '', email: user.email || '' }));
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cartItems.length) {
      setError('Your cart is empty. Add items before placing an order.');
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        product: item.id,
        qty: item.quantity,
        price: item.price,
      })),
      shippingAddress: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
      },
      totalPrice,
    };

    try {
      setLoading(true);
      setError('');
      await createOrder(orderData);
      clearCart();
      navigate('/orders');
    } catch (submitError) {
      setError('Unable to place order. Please try again.');
      console.error(submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Checkout</p>
          <h1 className="mt-4 text-4xl font-bold">Complete your order</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Full Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Phone</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">City</span>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Delivery Address</span>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
              </label>

              {error && <p className="rounded-3xl bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full justify-center rounded-full bg-[#C9A84C] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Placing order...' : 'Place Order'}
              </button>
            </form>
          </section>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <div>
              <h2 className="text-2xl font-semibold">Order Summary</h2>
              <p className="mt-2 text-sm text-slate-600">Review your items before confirming.</p>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4">
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span>TBD</span>
              </div>
              <div className="mt-6 border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                <span>Total</span>
                <span className="float-right">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
