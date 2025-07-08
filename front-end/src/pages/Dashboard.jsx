import { useState, useEffect } from "react";
import {
  FiBox,
  FiList,
  FiShoppingCart,
  FiLogOut,
  FiHome,
} from "react-icons/fi";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Ahmed Khan",
      amount: 34999,
      status: "Pending",
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
  });

  // For editing product (optional, just for UI)
  const [editProductId, setEditProductId] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  // Load products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  // Submit new product
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      const token = localStorage.getItem("token");

      if (editProductId) {
        // UPDATE PRODUCT
        await axios.put(
          `http://localhost:5000/api/products/${editProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Product updated");
      } else {
        // CREATE PRODUCT
        await axios.post("http://localhost:5000/api/products/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product created");
      }

      setActiveTab("products");
      setEditProductId(null);
      setNewProduct({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        image: null,
      });
      // Refresh products
      axios
        .get("http://localhost:5000/api/products/")
        .then((res) => setProducts(res.data.products));
    } catch (err) {
      console.error("Product creation/update failed", err);
      alert("Failed to create/update product");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Error deleting product");
    }
  };

  // Placeholder for edit (UI only)
  const handleEditProduct = (product) => {
    setEditProductId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category?._id || "",
      description: product.description,
      image: null,
    });
    setActiveTab("add-product");
  };

  useEffect(() => {
    if (activeTab === "categories") {
      fetchCategories();
    }
  }, [activeTab]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      const categoryData = res.data.categories;
      const productCounts = await Promise.all(
        categoryData.map(async (cat) => {
          const res = await axios.get(
            `http://localhost:5000/api/products?category=${cat._id}`
          );
          return res.data.products.length;
        })
      );
      const categoriesWithCount = categoryData.map((cat, idx) => ({
        ...cat,
        productCount: productCounts[idx],
      }));
      setCategories(categoriesWithCount);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/categories/", {
        name: categoryName,
      });
      setCategoryName("");
      fetchCategories(); // refresh list
      alert("Category created");
    } catch (err) {
      console.error("Failed to add category", err);
      alert(err.response?.data?.message || "Error creating category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories(); // refresh list
    } catch (err) {
      console.error("Failed to delete category", err);
      alert("Error deleting category");
    }
  };
  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchProducts();
      fetchCategories();
      fetchOrders();
    }
  }, [activeTab]);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="text-blue-600 text-2xl font-bold text-center py-6 border-b">
          Admin Panel
        </div>
        <nav className="p-4 space-y-4 font-medium text-gray-700">
          <button
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FiHome /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FiBox /> Products
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FiList /> Categories
          </button>
          <button className="flex items-center gap-3 hover:text-blue-600">
            <FiShoppingCart /> Orders
          </button>
          <button className="flex items-center gap-3 text-red-500 mt-8">
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "categories" && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Manage Categories
            </h2>

            <form onSubmit={handleAddCategory} className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="New Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="border px-4 py-2 rounded-md flex-1"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Add Category
              </button>
            </form>

            <table className="min-w-full bg-white text-sm rounded-md shadow-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-3 px-4">Category Name</th>
                  <th className="py-3 px-4">Total Products</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{cat.name}</td>
                    <td className="py-3 px-4 text-center">
                      {cat.productCount}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
            <div className="grid md:grid-cols-5 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Active Orders</h3>
                <p className="text-3xl font-semibold text-blue-600 mt-2">
                  {orders.filter(o => o.status === "Pending" || o.status === "Processing").length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Delivered Orders</h3>
                <p className="text-3xl font-semibold text-green-600 mt-2">
                  {87}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Cancelled Orders</h3>
                <p className="text-3xl font-semibold text-red-600 mt-2">
                  {4}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Dispatched Orders</h3>
                <p className="text-3xl font-semibold text-purple-600 mt-2">
                  {19}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Monthly Sale</h3>
                <p className="text-3xl font-semibold text-orange-600 mt-2">
                  PKR {767676
                  }
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Recent Orders
              </h2>
              <table className="min-w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{order._id}</td>
                      <td className="py-3 px-4">
                        {order.user?.name || order.shippingAddress?.fullName || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        PKR {(order.totalAmount || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="border rounded px-2 py-1 bg-gray-50"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Products
              </h2>
              <button
                onClick={() => {
                  setEditProductId(null);
                  setNewProduct({
                    name: "",
                    price: "",
                    stock: "",
                    category: "",
                    description: "",
                    image: null,
                  });
                  setActiveTab("add-product");
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Add Product
              </button>
            </div>
            <table className="min-w-full bg-white text-sm rounded-md shadow-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4">PKR {p.price}</td>
                    <td className="py-3 px-4">{p.stock}</td>
                    <td className="py-3 px-4">{p.category?.name || "N/A"}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-xs"
                        onClick={() => handleEditProduct(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                        onClick={() => handleDeleteProduct(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "add-product" && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {editProductId ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md"
              />
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-md"
              ></textarea>
              <input
                type="file"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    image: e.target.files[0],
                  })
                }
                className="w-full"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
              >
                {editProductId ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;