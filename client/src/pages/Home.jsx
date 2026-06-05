import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/ui/Spinner';
import productService from '../services/productService';
import api from '../services/api';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featuredData, categoriesData] = await Promise.all([
          productService.getAllProducts({ limit: 8 }),
          api.get('/categories'),
        ]);

        setFeatured(featuredData.products || []);
        setCategories((categoriesData.data || []).slice(0, 4));
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        <section
          className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-4 text-center text-white sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.5em] text-[#C9A84C]">New Collection 2026</p>
            <h1 className="text-[5rem] font-medium uppercase tracking-[0.8em] leading-none text-white sm:text-[6rem]">
              AMARA
            </h1>
            <p className="max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              Contemporary luxury, crafted for the modern African wardrobe with timeless silhouettes and refined details.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex rounded-full bg-[#C9A84C] px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-white/90"
              >
                Discover Now
              </Link>
              <Link
                to="/about"
                className="inline-flex rounded-full border border-white/40 bg-transparent px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
              >
                Our Story
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-black py-4">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-black/80" />
            <div className="relative mx-auto flex h-12 max-w-7xl items-center px-4 text-sm uppercase tracking-[0.35em] text-[#C9A84C] sm:px-6">
              <div className="animate-marquee whitespace-nowrap">
                NEW COLLECTION • FREE DELIVERY IN KIGALI • LUXURY FASHION • MADE FOR AFRICA • AMARA 2026 • NEW COLLECTION • FREE DELIVERY IN KIGALI • LUXURY FASHION • MADE FOR AFRICA • AMARA 2026 •
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#C9A84C]">Featured Collection</p>
              <h2 className="text-4xl font-semibold uppercase tracking-[0.15em] text-slate-900 sm:text-5xl">
                The season's most coveted pieces
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-24">
                <Spinner />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.slice(0, 4).map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}

            <div className="mt-10 text-right">
              <Link
                to="/shop"
                className="text-sm uppercase tracking-[0.35em] text-[#C9A84C] transition hover:text-black"
              >
                View All
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F5F5] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#C9A84C]">Categories</p>
              <h2 className="text-4xl font-semibold uppercase tracking-[0.15em] text-slate-900 sm:text-5xl">
                Discover by style
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category._id || category.id}
                    to={`/shop?category=${category.slug}`}
                    className="group relative overflow-hidden rounded-[2rem] bg-black text-white"
                  >
                    <div
                      className="h-80 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${category.image || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'}')`,
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 to-transparent px-6 py-6">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#C9A84C]">{category.name}</p>
                      <h3 className="mt-2 text-2xl font-semibold uppercase tracking-[0.1em] text-white">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full rounded-[2rem] border border-dashed border-slate-300 bg-white p-16 text-center text-slate-500">
                  No categories available right now.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-black py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#C9A84C]">Statement</p>
            <h2 className="mx-auto max-w-3xl text-4xl font-semibold uppercase tracking-[0.2em] text-[#C9A84C] sm:text-5xl">
              Fashion Redefined for Africa
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              AMARA brings contemporary luxury with bold silhouettes, rich materials, and refined craftsmanship designed for a modern African wardrobe.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-flex rounded-full bg-[#C9A84C] px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
            >
              Explore Shop
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
