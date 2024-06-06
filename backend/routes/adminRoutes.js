import express from "express";
import { loginAdmin, registerAdmin } from "../controller/adminController.js";
import { adminMiddleware } from "../middleware/adminMiddlware.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/create-product", adminMiddleware, upload.single("image"));

export const adminRouter = router;
