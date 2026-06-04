import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (submitError) {
      setError('Unable to create account. Please check your details and try again.');
      console.error(submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-112px)] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Join AMARA</p>
            <h1 className="mt-4 text-4xl font-bold">Create your account</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full Name</span>
              <input
                type="text"
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
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
              />
            </label>

            {error && <p className="rounded-3xl bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full justify-center rounded-full bg-[#C9A84C] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#C9A84C] hover:text-[#a98329]">
              Login here
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
