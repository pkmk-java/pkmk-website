import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllAdmin,
  getAllProduct,
  getAllUser,
  getCurrentAdmin,
  getStatistic,
  loginAdmin,
  registerAdmin,
  updateProduct,
  updateUserToAdmin,
} from "../controller/adminController.js";
import { adminMiddleware } from "../middleware/adminMiddlware.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.get("/me", adminMiddleware, getCurrentAdmin);
router.get("/get-statistic", adminMiddleware, getStatistic);
router.get("/get-all-product", adminMiddleware, getAllProduct);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post(
  "/create-product",
  adminMiddleware,
  upload.single("image"),
  createProduct
);
router.delete("/delete-product/:id", adminMiddleware, deleteProduct);
router.patch(
  "/update-product/:id",
  adminMiddleware,
  upload.single("image"),
  updateProduct
);
router.patch("/update-user/:id", adminMiddleware, updateUserToAdmin);
router.get("/get-all-user", adminMiddleware, getAllUser);
router.get("/get-all-admin", adminMiddleware, getAllAdmin);

export const adminRouter = router;
