import express from "express";
import {
  addProducts,
  dropProducts,
  getProducts,
} from "../controllers/ProductController";
import auth from "../middleware/Auth";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products/add", addProducts);
router.post("/products/drop", dropProducts);

export default router;
