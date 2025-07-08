// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String }, // optional
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
