import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const categorySections = [
  "House Interiors",
  "Living Room",
  "Office Interiors",
];

const Products = () => {
  const [p_list, setP_list] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setP_list(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const getProductsByCategory = (catName) =>
    p_list.filter(
      (product) =>
        (typeof product.category === "object"
          ? product.category.name
          : product.category) === catName
    );

  const sectionsToShow = selectedCategory
    ? categorySections.filter((cat) => cat === selectedCategory)
    : categorySections;

  return (
    <section className="px-6 lg:px-20 py-20 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        All Products
      </h1>
      {sectionsToShow.map((catName) => {
        const products = getProductsByCategory(catName);
        if (products.length === 0) return null;
        return (
          <div key={catName} className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">{catName}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  state={{ product }}
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Products;