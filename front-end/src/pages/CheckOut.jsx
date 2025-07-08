import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOut = () => {
  const { cartItems, getTotal } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery"); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: form,
        totalAmount: getTotal(),
        paymentMethod, // <-- SEND PAYMENT METHOD
      };
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/orders/", orderData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrderPlaced(true);
      setTimeout(() => {
        navigate("/confirmation");
      }, 2000);
    } catch (err) {
      alert("Order failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Checkout
      </h2>
      {orderPlaced ? (
        <div className="text-center text-green-600 text-xl font-semibold py-20">
          Order placed successfully! Redirecting to home...
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <form
            className="bg-white shadow rounded-lg p-8 space-y-6 lg:col-span-2"
            onSubmit={handleOrder}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-700">
              Shipping Information
            </h3>
  {/* Payment Method Selection */}
  <div className="mb-6">
    <label className="block text-gray-600 mb-2 font-semibold">
      Payment Method
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="paymentMethod"
          value="Cash on Delivery"
          checked={paymentMethod === "Cash on Delivery"}
          onChange={() => setPaymentMethod("Cash on Delivery")}
        />
        Cash on Delivery
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="paymentMethod"
          value="Credit Card"
          checked={paymentMethod === "Credit Card"}
          onChange={() => setPaymentMethod("Credit Card")}
        />
        Credit Card
      </label>
    </div>
  </div>
  <div className="mb-6">
    <label className="block text-gray-600 mb-2">Full Name</label>
    <input
      type="text"
      name="fullName"
      value={form.fullName}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded-md"
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-600 mb-2">City</label>
    <input
      type="text"
      name="city"
      value={form.city}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded-md"
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-600 mb-2">Postal Code</label>
    <input
      type="text"
      name="postalCode"
      value={form.postalCode}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded-md"
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-600 mb-2">Country</label>
    <input
      type="text"
      name="country"
      value={form.country}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded-md"
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-600 mb-2">Address</label>
    <textarea
      name="address"
      value={form.address}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded-md"
    />
  </div>
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md transition font-semibold"
  >
    {loading ? "Placing Order..." : "Place Order"}
  </button>
</form>

          {/* Payment Summary */}
          <div className="bg-white shadow rounded-lg p-6 h-fit">
            <h3 className="text-xl font-bold mb-4 text-gray-700">
              Payment Summary
            </h3>
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>PKR {getTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-blue-700">
                PKR {getTotal().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckOut;