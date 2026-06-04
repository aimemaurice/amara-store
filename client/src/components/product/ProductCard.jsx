import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const productId = product.id || product._id;

  const handleAdd = () => {
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      slug: product.slug,
    });
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-[2rem]">
      <Link to={`/product/${productId}`} className="block overflow-hidden">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/400x400'}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]">
            {product.category?.name || product.category || 'Fashion'}
          </span>
          <span className="text-sm font-semibold text-gray-500">${product.price?.toFixed(2)}</span>
        </div>
        <Link to={`/product/${productId}`} className="block">
          <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-[#C9A84C]">
            {product.name}
          </h3>
        </Link>
        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-full bg-[#C9A84C] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-[#C9A84C]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
