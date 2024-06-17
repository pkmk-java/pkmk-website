import express from "express";
import {
  addProductToCart,
  getAllProduct,
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
const router = express.Router();

router.get("/me", userMiddleware, getCurrentUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/get-all-product", userMiddleware, getAllProduct);
router.post("/add-item/:id", userMiddleware, addProductToCart);

export const userRouter = router;
