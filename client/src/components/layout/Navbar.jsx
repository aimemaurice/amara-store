import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileClick = () => {
    setOpen(false);
    navigate(user ? '/profile' : '/login');
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-white/15 transition duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-xl' : 'bg-black/60'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-medium uppercase tracking-[0.45em] text-[#C9A84C] transition hover:text-white">
          AMARA
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-sm font-light uppercase tracking-[0.2em] text-white transition duration-300 ${
                  isActive ? 'text-[#C9A84C]' : 'hover:text-[#C9A84C]'
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex flex-col items-start">
                  <span>{link.label}</span>
                  <span
                    className={`mt-1 h-0.5 w-0 rounded-full bg-[#C9A84C] transition-all duration-300 ${
                      isActive ? 'w-full' : 'group-hover:w-full sm:w-0'
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Search"
          >
            <HiOutlineSearch className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            onClick={() => navigate('/cart')}
            aria-label="Cart"
          >
            <HiOutlineShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#C9A84C] px-1.5 text-xs font-semibold text-black">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleProfileClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Profile"
          >
            <HiOutlineUser className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#C9A84C] hover:text-[#C9A84C] md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black px-8 py-8 text-white">
          <div className="mb-12 flex items-center justify-between">
            <span className="text-2xl font-medium uppercase tracking-[0.45em] text-[#C9A84C]">AMARA</span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C]"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>
          </div>

          <div className="grid gap-8 text-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-3xl font-light uppercase tracking-[0.35em] transition ${
                    isActive ? 'text-[#C9A84C]' : 'text-white hover:text-[#C9A84C]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/15 pt-10 text-sm text-slate-300">
            <button
              type="button"
              onClick={handleProfileClick}
              className="inline-flex w-full items-center justify-center rounded-full border border-[#C9A84C] px-6 py-4 text-base uppercase tracking-[0.2em] text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-black"
            >
              {user ? 'Profile' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate('/cart');
              }}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-6 py-4 text-base uppercase tracking-[0.2em] text-white transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            >
              Cart
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
