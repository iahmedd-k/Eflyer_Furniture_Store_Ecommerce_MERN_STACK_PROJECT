import Order from "../Models/Order_Model.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { paymentMethod,products, shippingAddress, totalAmount } = req.body;
    const user = req.user?._id || req.body.user;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products in order." });
    }
    if (!shippingAddress || !totalAmount) {
      return res.status(400).json({ message: "Missing shipping or total." });
    }

    const order = await Order.create({
      user,
      products,
      shippingAddress,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image");
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Orders for a User
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?._id || req.params.userId;
    const orders = await Order.find({ user: userId })
      .populate("products.product", "name price image");
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  
  }
};