import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Spinner from '../components/ui/Spinner';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        setSelectedImage(data.images?.[0] || '');
        setSelectedSize(data.sizes?.[0] || '');
        setSelectedColor(data.colors?.[0] || '');
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: selectedImage || product.images?.[0] || '',
      size: selectedSize,
      color: selectedColor,
      slug: product.slug,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : product ? (
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <section>
              <div className="grid gap-4 sm:grid-cols-4">
                {product.images?.map((image) => (
                  <button
                    type="button"
                    key={image}
                    className={`overflow-hidden rounded-3xl border p-2 transition ${
                      selectedImage === image ? 'border-[#C9A84C]' : 'border-slate-200'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img alt={product.name} src={image} className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
                <img
                  src={selectedImage || product.images?.[0] || 'https://via.placeholder.com/800x800'}
                  alt={product.name}
                  className="h-[560px] w-full object-cover"
                />
              </div>
            </section>

            <section className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">{product.category?.name || product.category}</p>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <p className="text-3xl font-semibold text-[#C9A84C]">${product.price?.toFixed(2)}</p>
              </div>

              <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">Description</h2>
                  <p className="text-slate-600">{product.description}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">Size</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes?.length > 0 ? (
                        product.sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              selectedSize === size ? 'border-[#C9A84C] bg-[#C9A84C] text-black' : 'border-slate-300 bg-white text-slate-700 hover:border-[#C9A84C]'
                            }`}
                          >
                            {size}
                          </button>
                        ))
                      ) : (
                        <p className="text-slate-500">No sizes available</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.colors?.length > 0 ? (
                        product.colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              selectedColor === color
                                ? 'border-[#C9A84C] bg-[#C9A84C] text-black'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-[#C9A84C]'
                            }`}
                          >
                            {color}
                          </button>
                        ))
                      ) : (
                        <p className="text-slate-500">No colors available</p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full rounded-full bg-[#C9A84C] px-6 py-4 text-base font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-[#C9A84C]"
                >
                  Add to Cart
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-16 text-center">
            <h2 className="text-2xl font-semibold">Product not found</h2>
            <p className="mt-3 text-slate-600">Please return to the shop and choose another item.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
