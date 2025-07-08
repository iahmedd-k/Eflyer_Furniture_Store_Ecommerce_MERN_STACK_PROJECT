import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} from "../Controllers/categoryController.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";
const c_router = express.Router();

// Create category (admin or protected route)
c_router.post("/", createCategory);

// Get all
c_router.get("/", getAllCategories);

// Get single
c_router.get("/:id", getCategoryById);

// Delete
c_router.delete("/:id",  deleteCategory);

export default c_router;
