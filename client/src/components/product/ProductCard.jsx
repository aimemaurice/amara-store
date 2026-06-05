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
    <article className="group overflow-hidden bg-white rounded-none transition-shadow duration-300 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.45)]">
      <div className="relative overflow-hidden">
        <Link to={`/product/${productId}`} className="block">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/600x600'}
            alt={product.name}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={handleAdd}
          className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 translate-y-10 rounded-full bg-black/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>

      <div className="space-y-3 px-4 py-5">
        <p className="text-[0.625rem] uppercase tracking-[0.45em] text-[#C9A84C]">
          {product.category?.name || product.category || 'Fashion'}
        </p>

        <Link to={`/product/${productId}`} className="block">
          <h3 className="text-base font-medium text-slate-900 transition duration-300 group-hover:text-[#C9A84C]">
            {product.name}
          </h3>
        </Link>

        <p className="text-base font-semibold text-slate-900">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
