import express from "express";
import { addProducts, getProducts } from "../controllers/ProductController";
import auth from "../middleware/Auth";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products/add", auth, addProducts);

export default router;
