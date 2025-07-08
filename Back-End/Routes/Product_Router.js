// routes/product.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controllers/Product_Controller.js";
import upload from "../Middlewares/Multer.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct); // image field in form-data

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id",  deleteProduct);

export default router;
