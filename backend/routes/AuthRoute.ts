import express from "express";
import { forgot, login, register } from "../controllers/AuthController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot", forgot);

export default router;
