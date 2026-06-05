import { Link } from 'react-router-dom';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.305.975.976 1.244 2.243 1.305 3.608.058 1.266.069 1.645.069 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.33 2.633-1.305 3.608-.976.975-2.243 1.244-3.608 1.305-1.266.058-1.645.069-4.85.069-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.33-3.608-1.305-.975-.976-1.244-2.243-1.305-3.608C2.175 15.585 2.163 15.206 2.163 12c0-3.204.012-3.584.07-4.85.062-1.366.33-2.633 1.305-3.608.976-.975 2.243-1.244 3.608-1.305C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.182 0-3.556.012-4.806.07-1.16.054-1.79.24-2.207.4-.546.23-.935.504-1.345.914-.41.41-.684.799-.914 1.345-.16.416-.345 1.046-.399 2.206-.058 1.25-.069 1.624-.069 4.806s.012 3.556.07 4.806c.054 1.16.239 1.79.399 2.206.23.546.504.935.914 1.345.41.41.799.684 1.345.914.416.16 1.046.345 2.206.399 1.25.058 1.624.069 4.806.069s3.556-.012 4.806-.07c1.16-.054 1.79-.239 2.206-.399.546-.23.935-.504 1.345-.914.41-.41.684-.799.914-1.345.16-.416.345-1.046.399-2.206.058-1.25.069-1.624.069-4.806s-.012-3.556-.07-4.806c-.054-1.16-.239-1.79-.399-2.206-.23-.546-.504-.935-.914-1.345-.41-.41-.799-.684-1.345-.914-.416-.16-1.046-.345-2.206-.399-1.25-.058-1.624-.069-4.806-.069z M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0-.001 2.88 1.44 1.44 0 0 0 .001-2.88z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: 'M18 2h-3a6 6 0 0 0-6 6v3H6v4h3v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h3V2z',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: 'M22.162 5.656a8.155 8.155 0 0 1-2.356.646 4.118 4.118 0 0 0 1.806-2.27 8.228 8.228 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.286 4.106 4.106 0 0 0 1.27 5.48 4.075 4.075 0 0 1-1.86-.514v.05a4.106 4.106 0 0 0 3.292 4.027 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 19.544a11.616 11.616 0 0 0 6.29 1.842c7.548 0 11.675-6.253 11.675-11.675 0-.178-.004-.355-.012-.531A8.348 8.348 0 0 0 22.162 5.656z',
  },
];

const Footer = () => (
  <footer className="bg-black text-white">
    <div className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">Join the AMARA World</p>
          <h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">
            Join the AMARA World
          </h2>
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Subscribe for exclusive offers and new arrivals.
          </p>
        </div>

        <form className="flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-full border border-white/20 bg-black px-5 py-4 text-sm text-white placeholder:text-white/50 focus:border-[#C9A84C] focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <div className="border-b border-[#C9A84C]/20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="text-2xl font-bold uppercase tracking-[0.4em] text-[#C9A84C]">AMARA</p>
          <p className="max-w-sm text-sm leading-7 text-white/70">
            A luxury African fashion house blending timeless elegance with contemporary silhouettes, crafted for the modern wardrobe.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">Quick Links</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="transition hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">Customer Care</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <Link to="/faq" className="transition hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="transition hover:text-white">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="transition hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/help" className="transition hover:text-white">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">Follow Us</p>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A84C] text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-black"
                aria-label={social.label}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="px-4 py-6 text-sm text-white/50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[#C9A84C]/20 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>© 2026 AMARA. All rights reserved.</p>
        <p>Made with ♥ in Kigali, Rwanda</p>
      </div>
    </div>
  </footer>
);

export default Footer;
