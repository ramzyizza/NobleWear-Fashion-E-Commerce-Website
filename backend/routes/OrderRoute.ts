import express from "express";
import {
  createOrder,
  getOrder,
  updateOrder,
} from "../controllers/OrderController";

const router = express.Router();

router.get("/order", getOrder);
router.post("/order/create", createOrder);
router.post("/order/update", updateOrder);

export default router;
