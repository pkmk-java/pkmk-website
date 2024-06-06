import express from "express";
import {
  addProductToCart,
  getAllProduct,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/get-all-product", userMiddleware, getAllProduct);
router.post("/add-item/:id", userMiddleware, addProductToCart);

export const userRouter = router;
