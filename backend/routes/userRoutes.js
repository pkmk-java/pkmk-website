import express from "express";
import {
  addProductToCart,
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { getAllProductGuest } from "../controller/guestController.js";
const router = express.Router();

router.get("/me", userMiddleware, getCurrentUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/get-all-product", getAllProductGuest);
router.post("/add-item/:id", userMiddleware, addProductToCart);

export const userRouter = router;
