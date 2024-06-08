import express from "express";
const router = express.Router();
import {
  getAllProduct,
  addToCart,
  GuestRemoveItemFromCart,
  getGuestCart,
} from "../controller/guestController.js";

router.get("/get-all-product", getAllProduct);
router.post("/add-to-cart/:id", addToCart);
router.delete("/remove-from-cart/:id", GuestRemoveItemFromCart);
router.get("/get-guest-cart", getGuestCart);

export const guestRouter = router;
