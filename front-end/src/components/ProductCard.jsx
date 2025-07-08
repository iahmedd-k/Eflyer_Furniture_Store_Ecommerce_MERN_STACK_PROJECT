import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <button className="absolute top-4 right-4 bg-white p-2 rounded-full text-gray-500 hover:text-red-500 shadow">
            <FiHeart size={18} />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-blue-600 font-semibold text-lg mt-1">{product.price}</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition flex items-center gap-2 text-sm">
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
