import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Make sure this path is correct
import axios from "axios";

const ProductPreviewSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  // Show only first 6 products (2 rows if 3 columns per row)
  const previewProducts = products.slice(0, 6);

  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2  hover:bg-blue-50">
          Featured Products
        </h2>
        <p className="text-gray-500 text-lg">
          Explore our hand-picked furniture catalog
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {previewProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            state={{ product }}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-12">
        <Link to="/products">
          <button className="bg-blue-600  text-white px-8 py-3 rounded-full hover:bg-blue-500 transition">
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ProductPreviewSection;
