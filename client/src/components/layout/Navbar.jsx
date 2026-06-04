import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Cart', to: '/cart' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-black text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
          <span className="inline-block rounded-sm border border-[#C9A84C] px-2 py-1">AMARA</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-[#C9A84C] p-2 text-[#C9A84C] hover:bg-white/10 sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        <nav className={`sm:flex sm:items-center ${open ? 'block' : 'hidden'}`}>
          <ul className="space-y-3 text-sm sm:ml-8 sm:flex sm:space-x-6 sm:space-y-0">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 transition-colors duration-150 ${
                      isActive ? 'bg-[#C9A84C] text-black' : 'text-white hover:bg-white/10'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  {link.label === 'Cart' && totalItems > 0 ? (
                    <span className="ml-2 inline-flex items-center rounded-full bg-[#C9A84C] px-2 py-0.5 text-xs font-semibold text-black">
                      {totalItems}
                    </span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:mt-0 sm:border-none sm:pt-0 sm:flex-row sm:items-center">
            {user ? (
              <>
                <span className="text-sm text-white/80">Hello, {user.name}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md border border-[#C9A84C] bg-[#C9A84C] px-4 py-2 text-black transition hover:bg-white/90"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="rounded-md border border-[#C9A84C] px-4 py-2 text-white transition hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md border border-[#C9A84C] px-4 py-2 text-white transition hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md border border-[#C9A84C] bg-[#C9A84C] px-4 py-2 text-black transition hover:bg-white/90"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
