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
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
      setTotalPages(1);
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
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            i === page ? 'bg-[#C9A84C] text-black' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
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

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Shop the Collection</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Discover your next wardrobe favorite</h1>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleCategoryClick('')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !selectedCategory ? 'bg-[#C9A84C] text-black' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id || category.id}
                type="button"
                onClick={() => handleCategoryClick(category.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category.slug
                    ? 'bg-[#C9A84C] text-black'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-auto">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products"
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 sm:w-80"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center">
                <h2 className="text-2xl font-semibold">No products found</h2>
                <p className="mt-3 text-slate-600">Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {paginationButtons}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
