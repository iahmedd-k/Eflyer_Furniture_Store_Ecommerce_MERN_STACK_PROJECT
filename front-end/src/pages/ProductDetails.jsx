import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext"; 

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedProduct = location.state?.product;
  const { addToCart } = useCart(); 

  const [product, setProduct] = useState(passedProduct || null);
  const [loading, setLoading] = useState(!passedProduct);

  useEffect(() => {
    if (!passedProduct) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          setProduct(res.data.product || res.data); 
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, passedProduct]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-gray-400">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="px-6 lg:px-20 py-20">
      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        <div className="lg:w-1/2">
          <img src={product.image} alt={product.name} className="rounded-xl shadow-lg w-full" />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-blue-600 mb-2">
            {typeof product.price === "number" ? `PKR ${product.price}` : product.price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <ul className="text-sm text-gray-700 space-y-1 mb-4">
            <li><strong>Category:</strong> {product.category?.name || product.category || "N/A"}</li>
            <li><strong>SKU:</strong> {product.sku || "N/A"}</li>
            <li><strong>In Stock:</strong> {product.stock}</li>
            <li><strong>Rating:</strong> {product.rating ? `${product.rating} ⭐` : "N/A"}</li>
          </ul>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
