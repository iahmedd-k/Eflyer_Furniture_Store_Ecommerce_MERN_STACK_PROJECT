import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} from "../Controllers/Order_Cotronller.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";

const o_router = express.Router();

o_router.post("/", isAuthenticated, createOrder);

o_router.get("/", getAllOrders);

o_router.get("/user/:userId",  getUserOrders);

o_router.put("/:id", updateOrderStatus);

o_router.delete("/:id", deleteOrder);

export default o_router;