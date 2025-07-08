import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext"; // Make sure this path is correct

// Replace with your Stripe public key
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    setSuccess(false);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setProcessing(false);
      return;
    }

    // This is a demo: in production, you should create a PaymentIntent on your backend and use its clientSecret
    setTimeout(() => {
      setSuccess(true);
      setProcessing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Pay with Card</h2>
      <CardElement className="border p-3 rounded" />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600 font-semibold">Payment Successful!</div>}
      <button
        type="submit"
        disabled={processing || !stripe}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md transition font-semibold"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentSummary = () => {
  const { cartItems, getTotal } = useCart();

  return (
    <div className="bg-white shadow rounded-lg p-6 h-fit min-w-[320px]">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Payment Summary</h3>
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
  );
};

const Confirmation = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-20 flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl">
        <Elements stripe={stripePromise}>
          <StripePaymentForm />
        </Elements>
        <PaymentSummary />
      </div>
    </section>
  );
};

export default Confirmation;