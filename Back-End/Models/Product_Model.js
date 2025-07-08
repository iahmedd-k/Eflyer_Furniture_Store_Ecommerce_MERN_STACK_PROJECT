import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" ,
     required: true,
  },
  countInStock: { type: Number, default: 0 },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      comment: String,
      rating: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
