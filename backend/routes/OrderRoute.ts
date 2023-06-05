import express from "express";
import {
  createOrder,
  getOrder,
  getOrderAdmin,
  updateOrder,
} from "../controllers/OrderController";

const router = express.Router();

router.get("/order", getOrder);
router.get("/order/admin", getOrderAdmin);
router.post("/order/create", createOrder);
router.post("/order/update", updateOrder);

export default router;
