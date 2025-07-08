import Product from "../Models/Product_Model.js";


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file?.path; // Cloudinary URL

    if (!name || !price || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter).populate("category", "name");
    res.status(200).json({ success: true, count: products.length, products });
    console.log("Fetching products...");
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
};


// Get Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const updates = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only creator or admin can update


    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only creator or admin can delete (add your logic here if needed)

    await Product.findByIdAndDelete(req.params.id); // <-- Use this instead of product.remove()
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
