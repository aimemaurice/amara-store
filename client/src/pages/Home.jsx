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
          className="relative flex min-h-[80vh] items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center text-white sm:px-6 lg:px-8">
            <p className="mb-4 text-sm uppercase tracking-[0.5em] text-[#C9A84C]">Luxury fashion for Africa</p>
            <h1 className="mb-6 text-5xl font-bold uppercase tracking-[0.25em] sm:text-6xl">AMARA</h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover the perfect blend of modern style and elegant heritage with our curated fashion collection.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="inline-flex rounded-full border border-white/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Featured Collection</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Shop our latest arrivals</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <Spinner />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Categories</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Discover by style</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category._id || category.id}
                    to={`/shop?category=${category.slug}`}
                    className="group overflow-hidden rounded-[2rem] bg-black text-white transition hover:-translate-y-1 hover:bg-[#111111]"
                  >
                    <div
                      className="h-56 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${category.image || 'https://images.unsplash.com/photo-1520975910-6647a3c92e1f?auto=format&fit=crop&w=1200&q=80'}')`,
                      }}
                    />
                    <div className="space-y-2 p-6">
                      <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">{category.name}</p>
                      <h3 className="text-xl font-semibold">{category.description || 'Shop the latest looks'}</h3>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-slate-500">No categories available.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
