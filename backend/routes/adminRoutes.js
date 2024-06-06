import express from "express";
import { loginAdmin, registerAdmin } from "../controller/adminController";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export const adminRouter = router;
