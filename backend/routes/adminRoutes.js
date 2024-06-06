import express from "express";
import {
  deleteProduct,
  loginAdmin,
  registerAdmin,
  updateProduct,
} from "../controller/adminController.js";
import { adminMiddleware } from "../middleware/adminMiddlware.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/create-product", adminMiddleware, upload.single("image"));
router.delete("/delete-product/:id", adminMiddleware, deleteProduct);
router.patch(
  "/update-product/:id",
  adminMiddleware,
  upload.single("image"),
  updateProduct
);

export const adminRouter = router;
