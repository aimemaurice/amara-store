import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/ui/Spinner';
import productService from '../services/productService';
import api from '../services/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(12);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get('category') || '';
    setSelectedCategory(categoryFromQuery);
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const filters = {
        page,
        limit,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
      };
      const data = await productService.getAllProducts(filters);
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalCount || data.totalItems || data.products?.length || 0);
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchTerm, page]);

  const handleCategoryClick = (slug) => {
    setSelectedCategory((current) => (current === slug ? '' : slug));
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const paginationButtons = useMemo(() => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(
        <button
          key={i}
          type="button"
          onClick={() => setPage(i)}
          className={`px-3 py-2 text-sm transition ${
            i === page ? 'text-[#C9A84C] font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="bg-white pb-10 pt-4">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">Shop</p>
            <h1 className="mt-4 text-5xl font-semibold uppercase tracking-[0.08em] text-slate-900 sm:text-6xl">
              The Collection
            </h1>
            <p className="mt-4 text-sm text-slate-500">{totalItems} pieces</p>
          </div>
        </section>

        <section className="sticky top-24 z-30 border-b border-slate-200 bg-white py-4 backdrop-blur-xl">
          <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => handleCategoryClick('')}
                className={`rounded-none px-3 py-2 text-sm uppercase tracking-[0.3em] transition ${
                  !selectedCategory
                    ? 'border-b-2 border-[#C9A84C] text-[#C9A84C]' 
                    : 'text-slate-600 hover:text-[#C9A84C]'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id || category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`rounded-none px-3 py-2 text-sm uppercase tracking-[0.3em] transition ${
                    selectedCategory === category.slug
                      ? 'border-b-2 border-[#C9A84C] text-[#C9A84C]' 
                      : 'text-slate-600 hover:text-[#C9A84C]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-md sm:w-auto">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products"
                className="w-full border-none border-b border-slate-200 bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#C9A84C] focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <div className="flex justify-center py-24">
              <Spinner />
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center">
              <h2 className="text-2xl font-semibold">No products found</h2>
              <p className="mt-3 text-slate-600">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <div key={product._id || product.id} className="border border-gray-100">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        {!loading && totalPages > 1 && (
          <div className="mt-10 flex justify-center text-sm text-slate-600">
            <div className="inline-flex items-center gap-4">
              {paginationButtons}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;