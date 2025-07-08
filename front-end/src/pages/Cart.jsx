import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, increment, decrement, remove, getTotal } = useCart();

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-lg flex items-center p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Price: PKR {item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => decrement(item._id)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-4 text-lg font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increment(item._id)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FiPlus />
                    </button>
                    <button
                      onClick={() => remove(item._id)}
                      className="ml-6 p-2 text-red-500 hover:text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="font-semibold text-blue-600 ml-auto">
                  PKR {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white shadow rounded-lg p-6 h-fit">
            <h3 className="text-xl font-bold mb-4 text-gray-700">
              Order Summary
            </h3>
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
            <Link to="/checkout">
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;