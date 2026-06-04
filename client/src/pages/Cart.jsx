import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  const handleDecrease = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Your Bag</p>
          <h1 className="mt-4 text-4xl font-bold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-16 text-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-3 text-slate-600">Add stylish pieces from AMARA to start your order.</p>
            <Link
              to="/shop"
              className="mt-8 inline-flex rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-[#C9A84C]"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.75fr]">
            <section className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 p-6 sm:flex-row sm:items-center">
                  <img
                    src={item.image || 'https://via.placeholder.com/200x200'}
                    alt={item.name}
                    className="h-32 w-32 flex-none rounded-3xl object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="mt-2 text-sm text-slate-600">${item.price?.toFixed(2)}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg font-semibold text-slate-900 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
                      >
                        -
                      </button>
                      <span className="min-w-[3rem] text-center text-lg font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg font-semibold text-slate-900 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-4 sm:items-end">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
                    >
                      Remove
                    </button>
                    <span className="text-sm text-slate-600">Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </section>

            <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <div>
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <p className="mt-2 text-sm text-slate-600">Review your selected items before checkout.</p>
              </div>

              <div className="space-y-3 rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span className="float-right">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block rounded-full bg-[#C9A84C] px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-[#C9A84C]"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
