import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFound = () => (
  <div className="min-h-screen bg-white text-slate-900">
    <Navbar />

    <main className="flex min-h-[calc(100vh-112px)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-slate-50 p-16 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">404</p>
        <h1 className="mt-4 text-5xl font-bold">Page not found</h1>
        <p className="mt-6 text-slate-600">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="mt-10 inline-flex rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-[#C9A84C]"
        >
          Back to Home
        </Link>
      </div>
    </main>

    <Footer />
  </div>
);

export default NotFound;
