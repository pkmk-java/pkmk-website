import express from "express";
const router = express.Router();
import {
  addToCart,
  GuestRemoveItemFromCart,
  getGuestCart,
  getAllProductGuest,
} from "../controller/guestController.js";

router.get("/get-all-product", getAllProductGuest);
router.post("/add-to-cart/:id", addToCart);
router.delete("/remove-from-cart/:id", GuestRemoveItemFromCart);
router.get("/get-guest-cart", getGuestCart);

export const guestRouter = router;
